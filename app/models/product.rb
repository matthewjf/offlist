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

  def self.in_bounds(bounds)
    if bounds
      lat = [bounds["northEast"]["lat"], bounds["southWest"]["lat"]]
      lng = [bounds["northEast"]["lng"], bounds["southWest"]["lng"]]
      return Product.where(lat: lat.min..lat.max,lng: lng.max..lng.min, active: true)
    else
      return Product.where(active: true)
    end
  end
end
