# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(username: 'moderator', password: 111111)
User.create!(username: 'bot', password: Figaro.env.bot_password!)
usernames = []
until usernames.length == 20
  username = Faker::Name.last_name.split(" ").map{|el| el.capitalize}.join("")
  usernames << username unless usernames.include?(username)
end

usernames.each do |username|
  User.create!(username: username, password: Figaro.env.user_passwords)
end
#Create general channel. Subscribe all users to General.
Channel.create!(name: 'general', user_id: User.first.id, private: false)
Channel.find_by(name: 'general').subscriber_ids = User.all.ids

#Create Bot Channels
users = User.all
users.each do |user|
  ch = Channel.create!(name:"bot", user_id: 2, private: true)
  ch.subscriber_ids = user.id
end

#Create public channels.

channel_names = ['design', 'sf', 'alumni']
channel_names.length.times do |n|
  a = Channel.create!(name: channel_names[n], private: false, user_id: User.first.id)
  a.subscriber_ids = User.all.ids
end

#Create Private Channels
ch = Channel.create!(name: 'upgrade project', user_id: User.first.id, private: true)
ch.subscriber_ids = [1 ,3,4, 8]

ch = Channel.create!(name: 'team', user_id: User.first.id, private: true)
ch.subscriber_ids = [1, 3, 5, 4, 8, 11]



#Create Messages
dates = []
150.times { dates.push(rand(1.month).seconds.ago)}
dates.sort!
# 150.times do |n|
#   user_id = n % 5 == 0 ? 2 : [1].concat((3..15).to_a).shuffle.sample
#   channel_id = n % 3 == 0 ? (1..5).to_a.shuffle.sample : 1
#   Message.create!(body: "#{n+1}:#{channel_id} - #{Faker::Lorem.paragraph}", user_id: user_id, channel_id: channel_id, created_at: dates[n])
# end

#general
channel = Channel.find_by(name: 'general')
channel_id = channel.id
user_ids = [3, 4, 5, 9, 11]

Message.create!(user_id: 3, channel_id: channel_id, body: "Hi there! :)", created_at: dates[0])

Message.create!(user_id: 3, channel_id: channel_id, body: "Did you guys hear about working during the long weekend? :o", created_at: dates[1])

Message.create!(user_id: 4, channel_id: channel_id, body: "Yes! Hopefully it is not a long day", created_at: dates[2])

Message.create!(user_id: 3, channel_id: channel_id, body: "Worst part is that the air conditioner will be off :o", created_at: dates[3])

Message.create!(user_id: 5, channel_id: channel_id, body: "Did anyone have plans though?", created_at: dates[4])

Message.create!(user_id: 11, channel_id: channel_id, body: "Yeah, I had a camping trip planned", created_at: dates[5])

Message.create!(user_id: 5, channel_id: channel_id, body: "Where were you going?", created_at: dates[6])

Message.create!(user_id: 11, channel_id: channel_id, body: "I had plans to go to Yosemite. Heard the weather there is really good this month.", created_at: dates[7])



#design
channel = Channel.find_by(name: 'design')
channel_id = channel.id
user_ids = [3, 4, 5, 9, 11]
Message.create!(user_id: 1, channel_id: channel_id, body: "Hi everyone, feel free to share some cool CSS tricks here!", created_at: dates[8])

Message.create!(user_id: 4, channel_id: channel_id, body: "Does anyone have experience using React components?", created_at: dates[9])

Message.create!(user_id: 3, channel_id: channel_id, body: "What king of functionality are you look for?", created_at: dates[10])

Message.create!(user_id: 4, channel_id: channel_id, body: "Something that can help with selections.", created_at: dates[11])

Message.create!(user_id: 3, channel_id: channel_id, body: "Search for React-Tags, there are a bunch of components that can help you out with this.", created_at: dates[10])

Message.create!(user_id: 4, channel_id: channel_id, body: "That helps sp much! Thank you! :)", created_at: dates[11])



#team
channel = Channel.find_by(name: 'team')
channel_id = channel.id
user_ids = [3, 5, 4, 8, 11]
Message.create!(user_id: 3, channel_id: channel_id, body: "Hey Team, incase you missed the announcement this morning, we will be working this long weekend...", created_at: dates[12])

Message.create!(user_id: 11, channel_id: channel_id, body: "Don't worry everyone, I talked to our director and got us a half-day on Monday, and also a day off the following week. It is a good thing that our team has a good director.", created_at: dates[13])

Message.create!(user_id: 3, channel_id: channel_id, body: "It is a good thing that our team has a good director. :D", created_at: dates[14])
