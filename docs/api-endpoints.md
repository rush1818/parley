# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `GET /api/users`
- `POST /api/users`
- `GET /api/users/guest`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Messages

- `GET /api/channels/:channel_id/messages`
  - Messages#index - returns messages for current user
- `POST /api/channels/:channel_id/messages`
- `DELETE /api/channels/:channel_id/messages/:id`

### Channels

- `GET /api/channels`
  - Returns all channels that current_user belongs to (includes Public and Private DMs)
- `PATCH /api/channels/`
  - Adds current_user as subscriber to channel
- `POST /api/channels/public`
  - Add a public channel
- `POST /api/channels/private`
  - Add a private channel/DM
- `GET /api/channels/public`
- `DELETE /api/channels/`
  - Remove current_user from channel
