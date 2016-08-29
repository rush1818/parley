# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `GET /api/users`
- `POST /api/users`
- `GET /api/users/guest`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Messages

- `GET /api/messages`
  - Messages#index - returns messages for current user
  - accepts `channel_id` query param to list messages by channel
- `POST /api/messages`
  - accepts `channel_id` query param to post messages to a channel
- `DELETE /api/messages/:id`

### Channels

- `GET /api/channels`
  - Returns all channels that current_user belongs to (includes Public and Private DMs)
- `POST /api/channels/public`
  - Add a public channel
- `POST /api/channels/private`
  - Add a private channel/DM
- `GET /api/channels/public`
- `DELETE /api/channels/`
  - Remove current_user from channel
