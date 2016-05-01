class Api::OffersController < ApplicationController
  before_action :require_current_user, only: :create

  def create
    @offer = Offer.new(offer_params)
    @offer.user = current_user
    if @offer.save
      render json: @offer
    else
      render json: @offer.errors.full_messages, status: 422
    end
  end

  private

  def offer_params
    params.require(:offer).permit(:amount, :comment, :product_id)
  end

end
