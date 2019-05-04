import { statusHelper } from 'services/server';

/**
 * @desc  Get page data from server
 * @param Object with data
 */
export const fetchPageData = queryData =>
  fetch(
    '/material-price-page/get',
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: queryData
    }
  )
    .then(statusHelper)
    .then(response => response.json())
    // .catch(error => error)
    .then(data => data);
