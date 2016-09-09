# Welcome to Parley!
![HomePage][home_img]
[home_img]: ./prod_assets/gifs/home.png

[Parley][live_site] is a single-page live-chat application inspired by [Slack][slack_link] built with Ruby-on-Rails on the backend
and JavaScript/React.js with Redux on the front end.

[Live Site][live_site]

[live_site]: http://www.parley-chat.xyz
[slack_link]: https://slack.com/
Try out Parley's functionality by signing in as a guest or creating an account!

## Features
* Sign in or create an account
* Join or leave a channel
* View complete message history of a channel
* Start a direct conversation with your friends
* Receive messages in real time via Web Sockets
* Chat with the Parley Bot
* Use Emojis to express yourself


## Features & Implementation

### Single-Page App

Parley is a single-page application built using Rails, React, and Redux. All content is delivered on one static page. Information is served via API calls to the Rails server, stored on the client using Redux, and rendered using React.

### Authentication

Parley employs front-end authentication for secure login and signup. It utilizes BCrypt for storing password digests in the database. Additionally to preview Parley, automated demo login is also set up.

![Demo Login][demo_login]
[demo_login]: ./prod_assets/gifs/demo_login.gif


### Messaging

Messages are stored in one table in the database with the following attributes:
 * `id`
 * `body`
 * `user_id`
 * `channel_id`

The `user_id` attribute associates a message to the author. This allows only the author to delete their messages. The `channel_id` attribute associates messages to the channel they belong to. Messages are rendered by a `MessageIndex` component.

The `MessageIndex` component renders each message via the `MessageList` component and also provides an input field via the `MessageForm` component.
* The `MessageList` component includes a React Emoji component that renders emoji-like text into actual emojis.
* The `MessageForm` component includes a React Emoji Picker component which allows a user to select emojis.

### Channels
Channels are stored in a table with the following attributes:
* `id`
* `name`
* `user_id`
* `private`

The `private` attribute is a boolean value that identifies if a channel is public or private (Direct Message). All channel names are modified to lowercase and joined into one word separated by a `-` (i.e. `lunch plans` is changed to `lunch-plans` before committing into the database). Users are `subscribed` to a channel by the `Subscription` join table.

`Public` Channel names are verified to ensure they are unique. If a user attempts to create a public channel that already exists, the Rails Controller and Model will `subscribe` the user to the existing channel.


### Subscriptions
Subscriptions are stored in the `Subscription` join table. The join table belongs to a `user` and a `channel`. Records in this table are created by using the following Rails Association Helper Methods:
* `user.subscribed_channel_ids`
* `channel.subcriber_ids`

When a user opens the Channel form, search results are displayed for existing channels which a user can subscribe to. If a user selects a suggested result, the `POST` request to the server subscribes the user to the channel. If the user inputs a new channel name, the `POST` request will create a new channel.

![Channel Suggestions][channel_demo]
[channel_demo]: ./prod_assets/gifs/channel_demo.gif

### Direct Messages (DM) / Group Messages
For private channels / direct messages (DM), channel names are not validated for uniqueness. A username input box provides existing user suggestions when a user starts typing. Creating a new conversation with a user adds the conversation into the user's DM list in real time.

![DM Convo][dm_demo]
[dm_demo]: ./prod_assets/gifs/dm_demo.gif


### Real Time Events
For Real Time Message functionality, [Pusher][pusher_link] API is used to create an Encrypted Web Socket connection between the client and the server. Once the connection is established, whenever a message is posted to the channel a user is on, a 'Pusher' event is triggered that the client listens for. This event triggers a callback to fetch new messages on the client. Similar events are used for:
* Real time message deletion
* Adding any new DM conversations if the user is added to a new DM conversation

[pusher_link]:https://pusher.com/

![RTM][rtm]
[rtm]: ./prod_assets/gifs/rtm_demo.gif

![RTM Delete][rtm_delete]
[rtm_delete]: ./prod_assets/gifs/delete_msg_demo.gif

### Bot User
A `bot` user is setup which connects to an external API. For every new user that joins Parley, the Rails Users Controller automatically creates a DM between the user and the `bot`.

```ruby
def create
    @user = User.new(user_params)
    if @user.save
      Pusher.trigger('users', 'new_user', {})
      @user.subscribed_channel_ids = 1
      ch = Channel.create!(name:"bot", user_id: 2, private: true)
      ch.subscriber_ids = @user.id
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
```
When a user posts a message to the `bot` conversation, if the message saves to the database, a call is made with the message content to the chatbot API. The response from the API call is saved under the `bot` username in the same channel. The bot is pre-configured by the API to reply to simple conversations.

![Bot Demo][bot_demo]
[bot_demo]: ./prod_assets/gifs/chat_bot_convo.gif

### Emojis :smiley:
[React-Emoji][emoji_render_link] and [React-Emoji-Picker][emoji_picker_link] components are used to render emojis present in the body of the message and emoji picker.

[emoji_render_link]: https://github.com/banyan/react-emoji
[emoji_picker_link]: https://github.com/chadoh/react-emoji-picker
![Emojis][emojis]
[emojis]: ./prod_assets/gifs/emoji_demo.gif

## Future Directions for the Project
In addition to the features already implemented, I plan on working on the following features.

#### Add message notifications
Currently, a user must open a channel to check for new messages. To combat this, I plan on implementing additional actions which would listen for new messages from other channels allowing users to be notified when new messages appear.

#### Upload images, snippets, and other media
I plan on using CarrierWave or Cloudinary to support file upload and utilize GitHub's Gists API to convert content into snippets. This will also help me to enable user profile images.
