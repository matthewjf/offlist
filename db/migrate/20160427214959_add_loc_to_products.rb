class AddLocToProducts < ActiveRecord::Migration
  def change
    add_column :products, :lat, :float
    add_column :products, :lng, :float

    Product.all.each do |product|
      product.lat = 37.7 + (rand()/10)
      product.lng = -122.4 - (rand()/10)
      product.save
    end

    change_column_null :products, :lat, false
    change_column_null :products, :lng, false
  end
end
