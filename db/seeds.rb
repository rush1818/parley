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


10.times do |n|
  Message.create!(body: Faker::Lorem.paragraph, user_id: 1, channel_id: 1)
end
