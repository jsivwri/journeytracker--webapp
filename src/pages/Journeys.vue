<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="box" v-if="loading">
      <progress class="progress is-primary" max="100"></progress>
    </div>
    <div v-else>
      <new-journey
        @close="toggleNewJourney"
        :active="newJourneyActive"
      ></new-journey>

      <div class="box">
        <div class="block">
          <button class="button is-primary" @click="toggleNewJourney">
            <span>🌟 New Journey</span>
          </button>
        </div>

        <div class="block">
          <div class="content is-hidden-tablet">
            <h2>Journeys</h2>

            <ul v-for="journey in journeys" :key="journey.id">
              <li>
                {{ journey.date }} - {{ journey.name }}-
                {{ journey.distance }} miles - {{ journey.transport }}

                <button
                  v-if="!confirmDelete[journey.id]"
                  class="button is-small"
                  @click="deleteJourney(journey.id)"
                >
                  🗑
                </button>

                <button
                  v-else
                  class="button is-danger is-small"
                  @click="confirmDeleteJourney(journey.id)"
                >
                  Sure?
                </button>
              </li>
            </ul>
          </div>
        </div>
        <section class="section">
          <div class="container">
            <div v-if="journeys.length === 0">Add your first journey!</div>
            <div v-else>
              <h2>Journeys</h2>
              <table class="table is-fullwidth is-bordered is-hidden-mobile">
                <thead>
                  <th class="t-date">Date</th>
                  <th class="t-journey">Journey</th>
                  <th class="t-distance">Distance</th>
                  <th class="t-type">Type</th>
                  <th class="t-control"></th>
                </thead>
                <tbody>
                  <tr v-for="journey in journeys" :key="journey.id">
                    <td>{{ journey.date }}</td>
                    <td>{{ journey.name }}</td>
                    <td>{{ journey.distance }} miles</td>
                    <td>{{ journey.transport }}</td>
                    <td v-if="!confirmDelete[journey.id]">
                      <button
                        class="button is-small"
                        @click="deleteJourney(journey.id)"
                      >
                        🗑
                      </button>
                    </td>
                    <td v-else>
                      <button
                        class="button is-danger is-small"
                        @click="confirmDeleteJourney(journey.id)"
                      >
                        Sure?
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import newJourney from '../components/journeys/NewJourney.vue';

export default {
  components: {
    newJourney
  },
  methods: {
    toggleNewJourney() {
      this.newJourneyActive = !this.newJourneyActive;
    },
    deleteJourney(id) {
      this.confirmDelete[id] = true;
      setTimeout(() => {
        this.confirmDelete[id] = false;
      }, 2500);
    },
    confirmDeleteJourney(id) {
      this.$store.dispatch('journeys/delete', id);
    }
  },
  data() {
    return {
      isLoading: true,
      newJourneyActive: false,
      confirmDelete: {}
    };
  },
  computed: {
    journeys() {
      return this.$store.getters['journeys/journeys'];
    },
    loading() {
      return this.$store.getters['journeys/isLoading'];
    }
  }
};
</script>

<style scoped>
.table {
  table-layout: fixed;
  width: 100%;
}

.t-date {
  width: 20%;
}

.t-distance {
  width: 15%;
}

.t-type {
  width: 10%;
}

.t-control {
  width: 10%;
  padding: 0px;
}

.t-mobile-control {
  width: px;
}
</style>
