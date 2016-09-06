class Api::UsersController < ApplicationController
  before_action :require_login, only: [:index]

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      Pusher.trigger('users', 'new_user', {})
      @user.subscribed_channel_ids = 1
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def guest_login
    @user = User.guest_user
    login!(@user)
    render "api/users/show"
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
