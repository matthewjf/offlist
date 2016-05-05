# == Schema Information
#
# Table name: products
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  active      :boolean          default("true")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  img_urls    :json
#  lat         :float            not null
#  lng         :float            not null
#  price       :integer          not null
#  user_id     :integer
#

class Product < ActiveRecord::Base
  default_scope -> { order(created_at: :desc) }

  validates :title, :description, :img_urls, :user, :price, presence: true
  belongs_to :user
  has_many :offers
  has_many :taggings, inverse_of: :product, dependent: :destroy
  has_many :tags, through: :taggings

  def tag_list=(tags)
    self.destroy_taggings
    self.tags = tags.map { |name| Tag.find_by_name(name) }.compact
  end

  def destroy_taggings
    self.taggings.delete_all
  end

  def deactivate!
    raise 'not active' unless self.active == true
    transaction do
      self.active = false
      self.save!

      # offer validation checks user so this might reduce queries? not sure
      Product.includes(:offers).find(self.id).offers.includes(:user).each { |offer| offer.decline!}
    end
  end

  def self.in_bounds(bounds = nil)
    if bounds
      lat = [bounds["northEast"]["lat"], bounds["southWest"]["lat"]]
      lng = [bounds["northEast"]["lng"], bounds["southWest"]["lng"]]
      return Product.where(lat: lat.min..lat.max,lng: lng.max..lng.min)
    else
      return Product.all
    end
  end

  def self.score(opts={})
    defaults = { "query" => '', "bounds" => nil, "active" => true}
    opts = (opts ? defaults.merge(opts) : defaults)

    filtered_result = Product.where(active: opts["active"]).in_bounds(opts["bounds"])
    if opts["query"].empty?
      return filtered_result.select(:id).order('count_id desc').group(:id).count(:id)
    end


    keywords = opts["query"].split(' ')
    result = filtered_result.search_by_keyword(keywords.shift)
    until keywords.empty?
      result = result.union_all(filtered_result.search_by_keyword(keywords.shift))
    end

    result.select("products.id").order('count_products_id desc').group("products.id").count("products.id")
  end

  def self.active
    Product.where(active: true)
  end

  # need to escape this
  def self.search_by_keyword(keyword)
    Product.joins(:taggings).joins(:tags).where(
      'LOWER(title) LIKE ? or LOWER(description) LIKE ? or LOWER(name) LIKE ?',
      "%#{keyword.downcase}%",
      "%#{keyword.downcase}%",
      "%#{keyword.downcase}%" )
  end

  def self.search(opts)
    scores = Product.score(opts)
    {products: Product.where(id: scores.keys), scores: scores}
  end

  def self.search_by_tag(keyword)
    Product.joins(:taggings).joins(:tags).where(
      'LOWER(name) LIKE ?',
      "%#{keyword.downcase}%"
    )
  end

end
