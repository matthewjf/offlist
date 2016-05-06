class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      @errors = @user.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      @products = @user.products.where(active: true)
      render "api/users/show"
    else
      @errors = nil
      render "api/shared/error", status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
