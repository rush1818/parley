const testFn = (data) =>{
  console.log(data);
  console.log("Error in session");
};

export const signup = (user, success, error)=>{
  if (!success) {success = testFn;}
  if (!error) {error = testFn;}

  $.ajax({
    url: '/api/users',
    method: 'POST',
    data: user,
    success,
    error
  });
};

export const login = (user, success, error)=>{
  if (!success) {success = testFn;}
  if (!error) {error = testFn;}

  $.ajax({
    url: '/api/session',
    method: 'POST',
    data: user,
    success,
    error
  });
};

export const logout = (success, error)=>{
  if (!success) {success = testFn;}
  if (!error) {error = testFn;}
  $.ajax({
    url: '/api/session',
    method: 'DELETE',
    success,
    error
  });
};

export const demoLoginAPI = (success, error)=>{
  if (!success) {success = testFn;}
  if (!error) {error = testFn;}

  $.ajax({
    url: '/api/users/guest',
    method: 'GET',
    success,
    error
  });
};
