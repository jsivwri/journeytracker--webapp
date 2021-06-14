<template>
  <login></login>
  <section class="hero is-info is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="home-title">
          COMET. 🚀
        </p>
        <p class="subtitle">
          Log travel and mileage with ease. Get started with a free
          account today
        </p>
        <div class="button is-white is-medium" @click="start">Get Started</div>
      </div>
    </div>
  </section>
</template>

<script>
import login from '../components/auth/AuthModel.vue';
export default {
  components: { login },
  emits: ['start'],
  methods: {
    start() {
      if (this.isAuthenticated) {
        this.$router.push('/journeys/');
      } else {
        this.$emit('start', 'signup');
      }
    }
  }
};
</script>

<style scoped>
.home-title {
  font-size: 5rem;
}
</style>
