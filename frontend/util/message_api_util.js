const testFn = (data) =>{
  console.log(data);
  console.log("Error in messages");
};

export const removeMessageAPI = (messageId, success, error)=>{
  if (!success) {success = testFn;}
  if (!error) {error = testFn;}

  $.ajax({
    url: `/api/messages/${messageId}`,
    method: 'DELETE',
    success,
    error
  });
};

export const receiveMessagesAPI = (id, date = null, success, error)=>{
  if (!success) {success = testFn;}
  if (!error) {error = testFn;}
  let url;
  if(date !== null) {
    url = `/api/channels/${id}/messages?date=${date}`;
  } else {
    url = `/api/channels/${id}/messages`;
  }

  $.ajax({
    url,
    method: 'GET',
    success,
    error
  });
};

export const createMessageAPI = (id, data, success, error)=>{
  if (!success) {success = testFn;}
  if (!error) {error = testFn;}
  $.ajax({
    url: `/api/channels/${id}/messages`,
    method: 'POST',
    data,
    success,
    error
  });
};
