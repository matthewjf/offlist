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

  validates :title, :description, :img_urls, :user, presence: true
  belongs_to :user
  has_many :offers

  def deactivate!
    raise 'not active' unless self.active == true
    transaction do
      self.active = false
      self.save!

      self.offers.each do |offer| # n + 1 query???
        offer.decline!
      end
    end
  end

  def self.in_bounds(bounds = nil)
    result = Product.where(active: true)
    if bounds
      lat = [bounds["northEast"]["lat"], bounds["southWest"]["lat"]]
      lng = [bounds["northEast"]["lng"], bounds["southWest"]["lng"]]
      return result.where(lat: lat.min..lat.max,lng: lng.max..lng.min)
    else
      return result
    end
  end

  def self.search(query)
    keywords = query.split(' ')
    result = Product.search_by_keyword(keywords.shift)
    until keywords.empty?
      result = result.union_all(Product.search_by_keyword(keywords.shift))
    end

    # generates an active record relation if that's what I need instead
    # result.select('id, count(id) as count_id').order('count_id desc').group(:id)

    # this generates a count hash
    result.select(:id).order('count_id desc').group(:id).count(:id)
  end

  def self.search_by_keyword(keyword)
    Product.where(
      'LOWER(title) LIKE ? or LOWER(description) LIKE ?',
      "%#{keyword.downcase}%",
       "%#{keyword.downcase}%")
  end

  def self.combined_search(query, bounds = nil)
    # runs 3 queries at eval
    Product.where(id: Product.search(query).keys).merge(Product.in_bounds(bounds))
  end
end
