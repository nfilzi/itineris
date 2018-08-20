Rails.application.routes.draw do
  root to: 'pages#home'

  resources :itineraries, only: [:show] do
    resources :points, only: [:create]
  end
end
