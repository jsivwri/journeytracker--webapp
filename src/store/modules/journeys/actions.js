import URL from '../.firebase.js';

export default {
  setLoading(context, payload) {
    const loadingState = payload;

    context.commit('setLoading', loadingState);
  },
  async createJourney(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      URL + `userData/${userId}/journeys.json?auth=${token}`,
      {
        method: 'POST',
        body: JSON.stringify(payload)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      // error...
    }

    context.commit('addJourney', { id: responseData.name, ...payload });
  },

  async readJourneys(context) {
    context.dispatch('setLoading', true);

    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      URL + `userData/${userId}/journeys.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      context.dispatch('setLoading', false);
      throw error;
    }

    const allJourneys = [];

    for (const key in responseData) {
      const journey = {
        id: key,
        name: responseData[key].name,
        date: responseData[key].date,
        distance: responseData[key].distance,
        miles: responseData[key].miles,
        transport: responseData[key].transport
      };
      allJourneys.push(journey);
    }
    context.dispatch('setLoading', false);
    context.commit('setJourneys', allJourneys);
  },

  async delete(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const journeyId = payload;

    const response = await fetch(
      URL + `userData/${userId}/journeys/${journeyId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error...
    }

    context.commit('delete', payload);
  }
};
