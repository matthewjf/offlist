class AddPriceToProducts < ActiveRecord::Migration
  def change
    add_column :products, :price, :integer

    Product.all.each do |product|
      product.price = rand(100)
      product.save
    end

    change_column_null :products, :price, false
  end
end
