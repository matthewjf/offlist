Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :offers, only: [:create, :edit]
    resources :products
    resource :user, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
  end
end
