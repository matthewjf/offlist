class Api::ProductsController < ApplicationController
  def index
    @products = Product.in_bounds(params[:bounds])
    render json: @products
  end

  def show
    @product = Product.find(params[:id])
    render json: @product
  end

  def create
    @product = Product.new(product_params)
    img_urls = params[:product][:img_urls]
    @product.img_urls = img_urls
    if @product.save
      render json: @product
    else
      render json: @product.errors.full_messages, status: 422
    end
  end

  def update
    @product = Product.find(params[:id])

    if @product.update(post_params)
      render json: @product
    else
      render json: @product.errors.full_messages, status: 422
    end
  end

  def destroy
    @product = Product.find(params[:id])

    if @product.destroy
      render json: @product
    else
      render json: @product.errors.full_messages, status: 422
    end
  end

  private

  def product_params
    params.require(:product).permit(:title, :description, :lat, :lng, :price)
  end
end
