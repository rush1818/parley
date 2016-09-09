# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(username: 'moderator', password: 111111)
User.create!(username: 'bot', password: Figaro.env.bot_password!)
#guest user
guest_user = User.create!(username: Faker::Name.last_name.split(" ").map{|el| el.capitalize}.join(""), password: Figaro.env.user_passwords)

#users for DM:
dm_user_1 = User.create!(username: 'Archie', password: Figaro.env.user_passwords)
dm_user_2 = User.create!(username: 'John', password: Figaro.env.user_passwords)
taken_users = ['Archie', 'John', 'bot', 'moderator']
usernames = []
until usernames.length == 100
  username = Faker::Name.last_name.split(" ").map{|el| el.capitalize}.join("")
  if !usernames.include?(username) && !taken_users.include?(username)
    usernames << username
  end
end

usernames.each do |username|
  User.create!(username: username, password: Figaro.env.user_passwords)
end
#Create general channel. Subscribe first 30 users to General.
Channel.create!(name: 'general', user_id: User.first.id, private: false)
Channel.find_by(name: 'general').subscriber_ids = (1..30).to_a

#Create Bot Channels for first 20 users
user_ids = (1..20).to_a
user_ids.each do |user_id|
  ch = Channel.create!(name:"bot", user_id: 2, private: true)
  ch.subscriber_ids = user_id
end

#Create public channels.

channel_names = ['accounting', 'marketing', 'sales']
channel_names.length.times do |n|
  a = Channel.create!(name: channel_names[n], private: false, user_id: User.first.id)
  a.subscriber_ids = user_ids
end

#Create Private Channels
ch = Channel.create!(name: 'Archie', user_id: User.first.id, private: true)
ch.subscriber_ids = [1 , guest_user.id, dm_user_1.id]

ch = Channel.create!(name: 'lunch-plans', user_id: User.first.id, private: true)
ch.subscriber_ids = [1, guest_user.id, dm_user_1.id, dm_user_2.id, 9]



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
user_ids = [3, 5, 4, 11]
Message.create!(user_id: 11, channel_id: channel_id, body: "Welcome to Parley! :) This app has cool features such as a bot, emojis, channels, and direct messages. If you leave a channel, you can always join back by typing the name in the create/join channel form. Note that you cannot leave the bot conversation and the general channel.", created_at: dates[1])

Message.create!(user_id: 5, channel_id: channel_id, body: "Wow! This app is so cool! It has a bot and emojis! :D :+1:", created_at: dates[2])

Message.create!(user_id: 5, channel_id: channel_id, body: "The user search while creating a DM is really convenient!", created_at: dates[3])

Message.create!(user_id: 11, channel_id: channel_id, body: "Yeah, the bot also tells jokes! Did any of you give the bot a try?", created_at: dates[4])

# Message.create!(user_id: 4, channel_id: channel_id, body: "The one with the neighbors and wifi was really good! :laughing:", created_at: dates[3])

Message.create!(user_id: 3, channel_id: channel_id, body: "Yeah the bot is really entertaining! :laughing:", created_at: dates[5])



#accounting
channel = Channel.find_by(name: 'accounting')
channel_id = channel.id
user_ids = [3, 4, 5, 9, 11]
Message.create!(user_id: 9, channel_id: channel_id, body: "Hi team, does anyone know when our 2017 forecast numbers are due? :bar_chart:", created_at: dates[8])

Message.create!(user_id: 4, channel_id: channel_id, body: "Yup, it's due at the end of the month.", created_at: dates[9])

Message.create!(user_id: 3, channel_id: channel_id, body: "How many slides do you guys have for the deck?", created_at: dates[10])

Message.create!(user_id: 4, channel_id: channel_id, body: "We are still drafting out the slides but we expect about 11-12 slides.", created_at: dates[11])

Message.create!(user_id: 3, channel_id: channel_id, body: "Awesome! :+1: Could you email me the slides once you are done so I can include them in the town hall meeting? ", created_at: dates[12])

Message.create!(user_id: 4, channel_id: channel_id, body: "Yup, will send them over to you ASAP :)", created_at: dates[13])




# marketing
channel = Channel.find_by(name: 'marketing')
channel_id = channel.id
user_ids = [3, 7, 9, 10, 14]

Message.create!(user_id: 10, channel_id: channel_id, body: "Can someone provide me a YTD campaign report for the AdWords display campaign?", created_at: dates[14])

Message.create!(user_id: 14, channel_id: channel_id, body: "Sure thing", created_at: dates[15])

Message.create!(user_id: 14, channel_id: channel_id, body: "Do you want me to split it out by device?", created_at: dates[15])

Message.create!(user_id: 10, channel_id: channel_id, body: "That would be great. It'll be helpful to see our mobile share in display.", created_at: dates[16])

Message.create!(user_id: 3, channel_id: channel_id, body: "Guys, I noticed our ad copy is a bit stale. Let's draft out some new ad text this afternoon.", created_at: dates[17])

Message.create!(user_id: 9, channel_id: channel_id, body: "Okay, I'll put something on our calendars. :calendar:", created_at: dates[18])



# sales
channel = Channel.find_by(name: 'sales')
channel_id = channel.id
user_ids = [3, 8, 15, 16, 17]

Message.create!(user_id: 16, channel_id: channel_id, body: "How is our pipeline looking for next month?", created_at: dates[19])

Message.create!(user_id: 15, channel_id: channel_id, body: "Things are looking pretty slim :disappointed: ", created_at: dates[20])

Message.create!(user_id: 17, channel_id: channel_id, body: "Good grief! Are there any local trade shows in the area?", created_at: dates[21])

Message.create!(user_id: 8, channel_id: channel_id, body: "I'll look into it.", created_at: dates[22])




#Archie
channel = Channel.find_by(name: 'archie')
channel_id = channel.id
user_ids = [guest_user.id, dm_user_1.id]

Message.create!(user_id: dm_user_1.id, channel_id: channel_id, body: "Did you see the new Maybach they displayed at the Monterey car fest?", created_at: dates[23])

Message.create!(user_id: guest_user.id, channel_id: channel_id, body: "Yeah, it looks great! The interior is beautiful. ", created_at: dates[24])

Message.create!(user_id: dm_user_1.id, channel_id: channel_id, body: "The car is too long though. I liked the new Lambo over it. :car::dash: ", created_at: dates[25])

Message.create!(user_id: guest_user.id, channel_id: channel_id, body: "Centenario looks amazing. It looks like a car from the future. Good thing that they didn't go crazy over the design as they did with the Veneno.", created_at: dates[26])

Message.create!(user_id: dm_user_1.id, channel_id: channel_id, body: "Agreed, they really went overboard with the Veneno.", created_at: dates[27])

Message.create!(user_id: guest_user.id, channel_id: channel_id, body: "A friend of mine was at the event and he got to meet Koenigsegg. I admire the way Koenigsegg has developed his brand. That One:1 is a piece of art!", created_at: dates[28])


#lunch-plans
channel = Channel.find_by(name: 'lunch-plans')
channel_id = channel.id
user_ids = [guest_user.id, dm_user_1.id, dm_user_2.id, 9]

Message.create!(user_id: dm_user_1.id, channel_id: channel_id, body: "Are we all still a go for lunch next weekend? :fork_and_knife:", created_at: dates[50])

Message.create!(user_id: dm_user_2.id, channel_id: channel_id, body: "Yes! Italian okay with everyone? :spaghetti:", created_at: dates[51])

Message.create!(user_id: 9, channel_id: channel_id, body: "Italian sounds yumm! :spaghetti::spaghetti:", created_at: dates[52])

Message.create!(user_id: guest_user.id, channel_id: channel_id, body: "Italian it is! Should I book a table for us for Saturday at 1pm?", created_at: dates[53])

Message.create!(user_id: 9, channel_id: channel_id, body: ":ok_hand:", created_at: dates[54])

Message.create!(user_id: dm_user_1.id, channel_id: channel_id, body: "Yup :ok_hand:", created_at: dates[54])
