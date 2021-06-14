import URL from '../.firebase.js';

export default {
  async createIssue(_context, payload) {
    const response = await fetch(URL + `bugs.json`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    // const responseData = await response.json();

    if (!response.ok) {
      // error...
      console.log(response.message)
    }
  }
};
