Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :offers, only: [:create, :update, :index]
    resources :products
    resource :user, only: [:create, :show]
    resources :users, only: [:show]
    resource :session, only: [:create, :destroy, :show]
  end
end
