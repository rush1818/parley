json.array! @channels.each do |channel|
  json.id channel.id
  json.name channel.name
  json.private channel.private
end
