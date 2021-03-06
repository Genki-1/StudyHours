Rails.application.routes.draw do
  root 'homes#top'
  # deviseの設定。deviseではなくuserコントローラから実装しているため、パスを直接指定する
  devise_for :users,controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks',
    passwords: 'users/passwords'
  }
  devise_for :admins,controllers: {
    sessions: 'admins/sessions'
  }
 
  resources :users,only:[:index,:show,:edit,:update] do
    member do
      get :following
      get :followers
      get :favorites
    end
  end

  resources :relationships, only: [:create,:destroy]

  resources :study_logs,only: [:show,:new,:create,:edit,:update,:destroy] do
    resources :study_log_comments, only: [:create,:destroy]
    resource :study_log_favorites, only: [:create,:destroy]
    collection do
      get :modal_study_log_new
    end
  end

  resources :notes,only: [:show,:new,:create,:edit,:update,:destroy] do
    resources :note_comments, only: [:create,:destroy]
    resource :note_favorites, only: [:create,:destroy]
    collection do
      get :preview
     end
  end

  resources :searchs,only: [:index] do
    collection do
      get :sort
      get :search
      get :more
    end
  end

  resources :timelines,only: [:index]
  resources :rooms,only:[:index,:show,:create] do
    collection do
      get :search
      get :return
      get :more
    end
  end

  resources :notifications, only: [:index]

  namespace :admins do
    resources :users, only: [:index,:show,:destroy,:update]
    resources :study_logs, only: [:index,:show,:destroy]
    resources :notes, only: [:index,:show,:destroy]
    resources :tags,only: [:index,:edit,:update]
  end
end