class CreatePoints < ActiveRecord::Migration[5.2]
  def change
    create_table :points do |t|
      t.references :itinerary, foreign_key: true, index: true
      t.float :latitude
      t.float :longitude
      t.string :city
      t.text :description

      t.timestamps
    end
  end
end
