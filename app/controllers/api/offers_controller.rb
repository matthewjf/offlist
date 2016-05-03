class Api::OffersController < ApplicationController
  before_action :require_current_user, only: :create
  before_action :require_target_user, only: :update

  def create
    @offer = Offer.new(offer_params)
    @offer.user = current_user

    if @offer.save
      render "api/offers/show"
    else
      @errors = @offer.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def update
    @offer = Offer.find(params[:id])
    @offer.status = params[:offer][:status]
    if @offer.save
      render "api/offers/show"
    else
      @errors = @offer.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  private

  def offer_params
    params.require(:offer).permit(:amount, :comment, :product_id)
  end

  def require_target_user
    @offer = current_user.received_offers.find(params[:id])
    render json: {status: 422, errors: {}} unless @offer
  end
end
