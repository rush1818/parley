# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(username: 'user', password: 111111)
User.create!(username: 'bot', password: Figaro.env.bot_password!)
usernames = []
until usernames.length == 20
  username = Faker::StarWars.vehicle.split(" ").map{|el| el.capitalize}.join("")
  usernames << username unless usernames.include?(username)
end

usernames.each do |username|
  User.create!(username: username, password: Figaro.env.user_passwords)
end

#Create public channels. Subscribe all users to General.
Channel.create!(name: 'general', user_id: User.first.id, private: false)
Channel.find_by(name: 'general').subscriber_ids = User.all.ids

channel_names = ['design', 'sf', 'atom', 'alumni']
channel_names.length.times do |n|
  a = Channel.create!(name: channel_names[n], private: false, user_id: User.first.id)
  a.subscriber_ids = User.all.ids if n %2 == 0
end

#Create Private Channels
ch = Channel.create!(name: 'upgrade project', user_id: User.first.id, private: true)
ch.subscriber_ids = [1,2,3]

ch = Channel.create!(name: 'team', user_id: User.first.id, private: true)
ch.subscriber_ids = [1,2,3, 5]

#Create Messages
dates = []
150.times { dates.push(rand(1.month).seconds.ago)}
dates.sort!
150.times do |n|
  user_id = n % 5 == 0 ? 2 : [1].concat((3..15).to_a).shuffle.sample
  channel_id = n % 3 == 0 ? (1..5).to_a.shuffle.sample : 1
  Message.create!(body: "#{n+1}:#{channel_id} - #{Faker::Lorem.paragraph}", user_id: user_id, channel_id: channel_id, created_at: dates[n])
end
