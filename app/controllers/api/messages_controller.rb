require 'cleverbot'
class Api::MessagesController < ApplicationController

  before_action :require_login
  def index
    @messages = Message.message_feed(params[:channel_id], 20, params[:date])
  end

  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.channel_id = params[:channel_id]
    @channel = Channel.find(params[:channel_id])
    if @channel.name == 'bot' && @channel.user_id == 2
      bot = Cleverbot.new(Figaro.env.cleverbot_user!, Figaro.env.cleverbot_api!)
      if @message.save
        bot_msg = Message.create(body:bot.say(@message.body), channel_id: params[:channel_id], user_id: 2 )
        Pusher.trigger('messages', 'new_message', {})
        render "api/messages/show"
      else
        render json: @message.errors.full_messages, status: 422
      end
    else
      if @message.save
        Pusher.trigger('messages', 'new_message', {}) #change channel name to channel_id after channels is implemented
        render "api/messages/show"
      else
        render json: @message.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @message = Message.find(params[:id])

    if @message.user == current_user
      msg_id = @message.id
      @message.destroy
      Pusher.trigger('messages', 'message_deleted', {id: msg_id})
      render json: {}
    else
      render json: ["Invalid Action"], status: 404
    end

  end

  def message_params
    params.require(:message).permit(:body)
  end
end
