class Api::MessagesController < ApplicationController

  before_action :require_login
  def index
    # @messages = Message.all
    @messages = Message.message_feed(1, 100)
  end

  def create
    @message = Message.new(message_params)
    @message.user = current_user
    if @message.save
      Pusher.trigger('messages', 'new_message', {}) #change channel name to channel_id after channels is implemented
      render "api/messages/show"
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    @message = Message.find(params[:id])

    if @message.user == current_user
      @message.destroy
      render json: {}
    else
      render json: ["Invalid Action"], status: 404
    end

  end

  def message_params
    params.require(:message).permit(:body, :channel_id)
  end
end
