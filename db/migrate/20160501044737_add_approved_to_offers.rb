class AddApprovedToOffers < ActiveRecord::Migration
  def change
    add_column :offers, :status, :string, default: "Pending"
  end
end
