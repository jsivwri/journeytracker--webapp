<template>
  <div class="modal is-clipped" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">🌟 New Journey</p>
        <button class="delete" aria-label="close" @click="cancel"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Transport</label>
          <div class="control">
            <div class="select">
              <select v-model="transport">
                <option key="car" value="car">🚗 Car</option>
                <option key="bike" value="bike">🚲 Bike</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Journey Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Journey Name" v-model="name" />
          </div>
        </div>

        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input class="input" type="text" placeholder="Date" v-model="date" />
          </div>
        </div>

        <div class="field">
          <label class="label">Distance</label>
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Distance" v-model="distance" />
            </p>
            <p class="control">
              <a class="button is-static">
                miles
              </a>
            </p>
          </div>
        </div>
        <p
        class="help is-danger"
        v-if="!!error"
      >
        {{ error }}
      </p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" :class="{ 'is-loading': loading }" @click="save">Save changes</button>
        <button class="button" @click="cancel">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['active'],
  emits: ['close'],
  data() {
    return {
      transport: "car",
      name: null,
      date: null,
      distance: null,
      loading: false,
      error: null,
    };
  },
  methods: {
      async save() {
          this.loading=true
          const newJourney = {
              transport: this.transport,
              name: this.name,
              date: this.date,
              distance: this.distance
          }
      
          try {
            await this.$store.dispatch('journeys/createJourney', newJourney)
            this.cancel()
          } catch (err) {
            this.error = err.message
          }
          this.loading=false
      },
        cancel() {
            this.transport = "car";
            this.name = null;
            this.date = null;
            this.distance = null;
            this.$emit('close')
        }
  }
};
</script>
