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

require 'test_helper'

class OfferTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
