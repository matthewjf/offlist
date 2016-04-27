class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.boolean :active, default: true

      t.timestamps null: false
    end
  end
end
