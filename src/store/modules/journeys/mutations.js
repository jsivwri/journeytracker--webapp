

export default {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  addJourney(state, payload) {
    state.journeys.push(payload);
  },
  setJourneys(state, payload) {
    state.journeys = payload;
  },
  delete(state, payload) {
    state.journeys = state.journeys.filter(element => element.id !== payload);
  }
};
