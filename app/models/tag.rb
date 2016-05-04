# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  has_many :taggings, inverse_of: :tag, dependent: :destroy
  has_many :tags, through: :taggings
  validates :name, presence: true
end
