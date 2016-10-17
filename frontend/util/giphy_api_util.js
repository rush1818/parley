export const fetchGif = (success, queryString) => {
  $.ajax({
    method: 'GET',
    url: `http://api.giphy.com/v1/gifs/search?q=${queryString}&rating=pg-13&api_key=dc6zaTOxFJmzC`,
    success,
  });
};
