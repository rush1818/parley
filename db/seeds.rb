# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(username: 'user', password: 111111)
usernames = []
until usernames.length == 20
  username = Faker::StarWars.vehicle.split(" ").map{|el| el.capitalize}.join("")
  usernames << username unless usernames.include?(username)
end

usernames.each do |username|
  User.create!(username: username, password: Figaro.env.user_passwords)
end

Channel.create!(name: 'general', user_id: User.first.id, private: false)
Channel.find_by(name: 'general').subscriber_ids = User.all.ids
channel_names = ['design', 'sf', 'atom', 'alumni']
channel_names.length.times do |n|
  Channel.create!(name: channel_names[n], private: false, user_id: User.first.id)
end

dates = []
50.times { dates.push(rand(1.month).seconds.ago)}
dates.sort!
50.times do |n|
  user_id = n % 3 == 0 ? (1..15).to_a.shuffle.sample : 1
  Message.create!(body: "#{n+1} - #{Faker::Lorem.paragraph}", user_id: user_id, channel_id: 1, created_at: dates[n])
end
