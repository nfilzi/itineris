class ItinerariesController < ApplicationController
  def show
    @itinerary = Itinerary.find(params[:id])

    @points  = @itinerary.points.displayable_on_map.order(created_at: :asc)
    @markers = @points.map.with_index do |point, index|
      {
        lat: point.latitude,
        lng: point.longitude,
        infoWindow: {
          content: render_to_string(partial: "/points/map_box", locals: { point: point })
        },
        # to be replaced with position column on points, to allow user to change position if needed!
        label: (index + 1).to_s
      }
    end

    @point = Point.new
  end
end
