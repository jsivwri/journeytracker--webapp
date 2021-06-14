<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" @click.prevent="routerPush('/')">
        <strong>COMET 🚀</strong>
      </a>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': active }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarActive"
        @click="toggleNav"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarActive" class="navbar-menu" :class="{ 'is-active': active }">
      <div class="navbar-start">

        <a class="navbar-item" @click="routerPush('/about')">
          About
        </a>

        <a class="navbar-item" @click="openBugModel">
          Report an issue
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="isAuthenticated">
              <a class="button is-primary" @click="routerPush('/journeys')">
                <strong>View Journeys</strong>
              </a>
              <a class="button is-light" @click="$store.dispatch('logout')">
                Log out
              </a>
            </div>
            <div v-else>
              <a class="button is-primary" @click="openAuthModel('signup')">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" @click="openAuthModel('login')">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    routerPush(route){
      this.$router.push(route)
    },
    toggleNav() {
      this.active = !this.active;
    },
    logout() {
      this.$store.dispatch('logout');
    },
    openAuthModel(mode) {
      this.$emit('start', mode)
    },
    openBugModel(){
      this.$emit('bug')
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
