class Itinerary < ApplicationRecord
  has_many :points, dependent: :destroy
end
