class AddImgUrlsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :img_urls, :json
  end
end
