Itinerary.destroy_all

japan = Itinerary.create(name: 'Trip au Japon, dinguerie', country: 'Japan')

points_attributes = [
  {itinerary: japan, city: 'Tokyo'},
  {itinerary: japan, city: 'Takayama'},
  {itinerary: japan, city: 'Kyoto'}
]

points_attributes.each do |point_attributes|
  Point.create(point_attributes)
end
