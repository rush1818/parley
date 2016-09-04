class Api::ChannelsController < ApplicationController
  before_action :require_login

  def index
    if params[:private]
      @channels = current_user.private_channels
      render "api/channels/index"
    else
      @channels = current_user.public_channels
      render "api/channels/index"
    end
  end

  def public
    @channel = Channel.new(channel_params)
    @channel.user = current_user
    @channel.subscriber_ids = @channel.subscriber_ids << current_user.id

    @channel.private = false
    if @channel.save
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def private
    @channel = Channel.new(channel_params)
    @channel.user = current_user
    @channel.subscriber_ids = @channel.subscriber_ids << current_user.id
    @channel.private = true
    if @channel.save
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def channel_params
    params.require(:channel).permit(:name, subscriber_ids: [])
  end
end
