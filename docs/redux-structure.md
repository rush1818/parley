# Redux Structure

The application's state is organized by data type. Under each data type, there
may be sub-states. Each action is listed with the sequence of events that
results from its invocation, ending with the API or a reducer. Subscribed
components, i.e. containers, are listed at the end.

Using this document, you should be able to trace an **action** starting with
where it was invoked, through the **API**/**reducer** involved, and finally to
the **components** that update as a result. Once you start implementing your
Redux structure, you'll need to do the same.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `LoginForm` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `onEntry`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `fetchAllUsers`
  0. invoked from `ChannelForm` `didMount`
  0. `GET /api/users` is called.
  0. `receiveAllUsers` is set as the success callback

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` stores `currentUser` in the application's state.
* `removeCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` removes `currentUser` from the application's state.
* `receiveAllUsers`
  0. invoked from an API callback
  0. the `SessionReducer` stores `allUsers` in the application's state.

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests.
  0. the `ErrorReducer` stores the `form` in the application's state; `errors` are mapped to their respective forms.
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests.
  0. the `ErrorReducer` removes `errors` for a given `form` in the application's state.

## Messages Cycles

### Messages API Request Actions

* `fetchAllMessages`
  0. invoked from `MessageIndex` `didMount`/`willReceiveProps`
  0. `GET /api/messages/channel_id` is called.
  0. `receiveAllMessages` is set as the success callback.

* `createMessages`
  0. invoked from MessageForm `onKeydown(Enter)`
  0. `POST /api/messages/channel_id` is called.
  0. `receiveSingleMessage` is set as the success callback.

* `destroyMessage`
  0. invoked from delete message button `onClick`
  0. `DELETE /api/messages/:id` is called.
  0. `removeSingleMessages` is set as the success callback.

### Messages API Request Actions
* `receiveAllMessages`
  0. invoked from API callback.
  0. The `MessageReducer` updates `messages` in the application's state.

* `receiveSingleMessage`
  0. invoked from API callback.
  0. The `MessageReducer` updates `messages` in the application's state.

* `removeSingleMessage`
  0. invoked from API callback.
  0. The `MessageReducer` updates `messages` in the application's state.

## Channels Cycles

### Channels API Request Actions

* `fetchAllChannels`
  0. invoked from `ChannelIndex` `didMount`/`willReceiveProps`.
  0. `GET /api/channels` is called.
  0. `receiveAllChannels` is set as success callback.

* `createChannel`
  0. invoked from ChannelForm `onSubmit`
  0. `POST /api/channels/public` is called.
    0. `POST /api/channels/private` is called if Private is selected.
  0. `receiveSingleChannel` is set as success callback.

* `destroyChannel`
  0. `DELETE /api/channels/` is called onClick.
  0. `removeSingleChannel` is set as success callback.

### Channels API Response Actions

* `receiveAllChannels`
  0. invoked from an API callback.
  0. the `ChannelReducer` updates `channels` in the application's state for all `public` channels and `privateDMs` in the application's state for all `private` channels..

* `receiveSingleChannel`
  0. invoked from an API callback.
  0. the `ChannelReducer` updates `channel[id]` or `privateDMs[id]` in the application's state.

* `removeSingleChannel`
  0. invoked from an API callback.
  0. the `ChannelReducer` removes `channel[id]` or `privateDMs[id]` from the application's state.
