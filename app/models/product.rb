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
#

class Product < ActiveRecord::Base
  default_scope -> { order(created_at: :desc) }

  validates :title, :description, :img_urls, :user, presence: true
  belongs_to :user
  def self.in_bounds(bounds)
    lat = [bounds["northEast"]["lat"], bounds["southWest"]["lat"]]
    lng = [bounds["northEast"]["lng"], bounds["southWest"]["lng"]]

    Product.where(lat: lat.min..lat.max,lng: lng.max..lng.min)
  end
end
