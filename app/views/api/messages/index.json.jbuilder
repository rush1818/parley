json.array! @messages.each do |message|
  json.id message.id
  json.user_id message.user_id
  json.channel_id message.channel_id
  json.body message.body
end
