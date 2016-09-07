# Parley

[Heroku link][heroku] **Note:** This link will be updated once pushed to Heroku.

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Parley is a web application inspired by Slack built using Ruby on Rails and React/Redux.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] Production README
- [ ] Live chat
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
- [ ] Channels
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
- [ ] Direct Message
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
- [ ] Teams or multi-person DM
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Redux Structure][redux-structure]
* [Sample State][sample-state]

[wireframes]: ./wireframes
[components]: ./component-heirarchy.md
[redux-structure]: ./redux-structure.md
[sample-state]: ./sample-state.md
[api-endpoints]: ./api-endpoints.md
[schema]: ./schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days, W1 Wed)

**Objective:** Functioning rails project with front-end Authentication

- [ ] New Rails project
- [ ] `User` model/migration
- [ ] Back end authentication (session/password)
- [ ] `StaticPages` controller and root view
- [ ] Webpack & React/Redux modules
- [ ] `APIUtil` to interact with the API
- [ ] Redux cycle for frontend authentication
- [ ] User signup/signin components
- [ ] Blank landing component after signup/signin
- [ ] Style signup/signin components
- [ ] Seed users
- [ ] Review phase 1

### Phase 2: Message Model, API, live chat, and components (2 days, W1 Fri)

**Objective:** Messages can be created, read, and destroyed through the API.

- [ ] `Message` model
- [ ] Seed database with a small amount of test data
- [ ] CRUD API for message (`MessagesController`)
- [ ] Use Pusher API to support live chats
- [ ] JBuilder views for messages
- [ ] Message components and respective Redux cycle
  - [ ] `MessageIndex`
  - [ ] `MessageIndexItem`
  - [ ] `MessageForm`
- [ ] Autosave message feature
- [ ] Style message components

### Phase 3: Channels (2 day, W2 Tue)

**Objective:** Messages belong to Channels that can be created, read, and destroyed through the API.

- [ ] `Channel` model
- [ ] Seed database with test data
- [ ] CRUD API for channels (`ChannelsController`)
- [ ] JBuilder views for channels
- [ ] Adding messages requires a channel
- [ ] Viewing messages by channel
- [ ] Style channel components
- [ ] Seed notebooks

### Phase 4: Single/Multi-Person Direct Message (1 day, W2 Wed)

**Objective:** Messages can be sent directly to other users privately. Direct Messages (DM) are similar to Channels, the only difference being they are private.

- [ ] Add `private` boolean column to `Channel` table
- [ ] Update `ChannelsController` controller `#index` action to render messages according to the `Private` value.
- [ ] Seed database for Direct Messages
- [ ] `DirectMessage` component and respective Redux cycle
- [ ] Style `DirectMessage` components

### Phase 5: Production README, final Styling and bonus features(2 days)

**Objective:** Clean up database and seed it with adequate data. Improve site styling. Work on bonus features.

### Bonus Features
- [ ] Search for messages
- [ ] Notification alerts
- [ ] Emojis in messages
- [ ] Code Snippets in messages
