class Api::ChannelsController < ApplicationController
  before_action :require_login

  def index
    if params[:private]
      @channels = current_user.private_channels
      render "api/channels/index"
    elsif params[:feed]
      @channels = current_user.feed_channels
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
    duplicate_channel = @channel.duplicate_channel
    @channel.private = false
    if @channel.save
      Pusher.trigger('channels', 'new_channel', {})
      render "api/channels/show"
    elsif duplicate_channel
      @channel = duplicate_channel
      @channel.subscriber_ids = @channel.subscriber_ids << current_user.id
      Pusher.trigger('channels', 'new_channel', {})
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
      Pusher.trigger('channels', 'new_channel', {})
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

  def destroy
    @channel = Channel.find(params[:id])
    subscriber_ids = @channel.subscriber_ids if @channel
    if @channel && subscriber_ids.include?(current_user.id)
      @channel.subscriber_ids = subscriber_ids.reject{|el| el == current_user.id}
      render "api/channels/show"
    else
      render json: ["Invalid Channel"], status: 422
    end
  end

  def channel_params
    params.require(:channel).permit(:name, subscriber_ids: [])
  end
end
