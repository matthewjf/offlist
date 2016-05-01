# == Schema Information
#
# Table name: offers
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  product_id :integer          not null
#  amount     :integer          not null
#  comment    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Offer < ActiveRecord::Base
  validates :user, :product, :amount, presence: true
  validate :active_product_validation, on: :create

  belongs_to :user
  belongs_to :product

  private
  def active_product_validation
    errors.add(:product_id, 'is not active') unless offer.product.active?
  end
end
