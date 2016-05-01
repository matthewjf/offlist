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
#  status     :string           default("Pending")
#

class Offer < ActiveRecord::Base
  validates :user, :product, :amount, presence: true
  validate :active_product_validation, on: :create
  validate :product_belongs_to_self, on: :create
  validates :status, inclusion: {in: ['Pending', 'Accepted', 'Declined']}

  belongs_to :user
  belongs_to :product

  def accept!
    self.status = 'Accepted'
    self.save!
  end

  def decline!
    self.status = 'Declined'
    self.save!
  end

  private
  def active_product_validation
    errors.add(:product_id, 'is not active') unless Product.find(product_id).active?
  end

  def product_belongs_to_self
    errors.add(:product_id, 'belongs to you') if Product.find(product_id).user_id == user_id
  end
end
