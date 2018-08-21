class Point < ApplicationRecord
  belongs_to :itinerary

  geocoded_by :city_with_country
  after_validation :geocode, if: :will_save_change_to_city?

  scope :displayable_on_map, -> { where.not(latitude: nil, longitude: nil) }

  def city_with_country
    "#{city}, #{itinerary.country}"
  end
end
