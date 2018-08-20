class PointsController < ApplicationController
  def create
    @point     = Point.new(point_params)
    @itinerary = Itinerary.find(params[:itinerary_id])

    @point.itinerary = @itinerary

    if @point.save
      respond_to do |format|
        format.html { redirect_to itinerary_path(@itinerary) }

        response = {
          lat: @point.latitude,
          lng: @point.longitude,
          infoWindow: {
            content: render_to_string(
              partial: "/points/map_box.html.erb",
              locals: { point: @point }
            )
          },
          label: @itinerary.points.count.to_s,
          cardMarkup: {
            content: render_to_string(
              partial: "/points/card.html.erb",
              locals: { point: @point }
            )
          }
        }

        format.json { render json: response.to_json }
      end
    else
      format.html { render 'itineraries/show' }
      format.json { render json: { error: 'Sth went wrong' }.to_json }
    end
  end

  private

  def point_params
    params.require(:point).permit(:city)
  end
end
