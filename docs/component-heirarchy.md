## Component Heirarchy

**AuthModalContainer**
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
    + MessageForm


## Routes

|Path   | Component   |
|-------|-------------|
| "/"   | "HomeContainer with AuthModalContainer" |
| "/channel/:channel_name" | "ContentContainer" |
