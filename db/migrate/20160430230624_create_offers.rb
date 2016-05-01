class CreateOffers < ActiveRecord::Migration
  def change
    create_table :offers do |t|
      t.references :user, index: true, foreign_key: true, null: false
      t.references :product, index: true, foreign_key: true, null: false
      t.integer :amount, null: false
      t.text :comment

      t.timestamps null: false
    end
  end
end
