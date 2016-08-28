## Component Heirarchy

**AuthFormContainer**
  - AuthForm

**HomeContainer**
  - Sidebar
  - Content

**ChannelsContainer**
  - ChannelList
    * ChannelForm

**ChannelModalForm**
  - Private toggle
  - NewChannel Button
    + UserList

**DMContainer**
  - DMList
    + ChannelForm

**Content**
  - Channel/DM Detail
  - MessageIndex
    + MessageList
    + MessageDetail
  - MessageForm


## Routes

|Path   | Component   |
|-------|-------------|
| "/signup" | "AuthFormContainer" |
| "/login" | "AuthFormContainer" |
| "/messages/:channel_name" | "HomeContainer" |
