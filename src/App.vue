<template>
  <auth-model
    :active="authModelVisible"
    :mode="authModelMode"
    @close="closeAuthModel"
    @switchMode="switchMode"
  ></auth-model>
    <bug :active="bugModelVisible" @close="closeBugModel"></bug>
  <div>
    <the-header @start="openAuthModel" @bug="openBugModel"></the-header>

    <router-view v-slot="slotProps" @start="openAuthModel">
      <component :is="slotProps.Component"></component>
    </router-view>

    <the-footer></the-footer>
  </div>
</template>

<script>
import authModel from './components/auth/AuthModel.vue';
import bug from './pages/Bug.vue'

export default {
  components: { authModel, bug },
  created() {
    this.$store.dispatch('tryLogin');
  },
  data() {
    return {
      showNav: false,
      authModelVisible: false,
      authModelMode: 'login',
      bugModelVisible: false
    };
  },
  methods: {
    openBugModel() {
      this.bugModelVisible = true;
    },
    closeBugModel() {
      this.bugModelVisible = false;
    },
    closeAuthModel() {
      this.authModelVisible = false;
    },
    openAuthModel(mode) {
      this.authModelMode = mode;
      this.authModelVisible = true;
    },
    switchMode() {
      if (this.authModelMode === 'login') {
        this.authModelMode = 'signup'
      } else {
        this.authModelMode = 'login'
      }
    }
  }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css';
</style>
