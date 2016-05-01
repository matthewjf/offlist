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

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
