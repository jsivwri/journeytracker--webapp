<template>
  <base-model :active="active">
    <template v-slot:header>
     
        <div class="field is-grouped">
        <p class="control">{{ label }} 🔒</p>
          <p class="control">
            <button
              class="button is-small"
              @click="switchMode"
            >
              Switch to {{ alt_label }}
            </button>
          </p>
      
      </div>
    </template>

    <template v-slot:default>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            :class="{
              'is-danger': !formValid.email || !formValid.authentication
            }"
            type="email"
            placeholder="Email"
            v-model.trim="email"
          />
        </div>
        <p class="help is-danger" v-if="!formValid.email">
          Please enter your email
        </p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            :class="{
              'is-danger': !formValid.password || !formValid.authentication
            }"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <p class="help is-danger" v-if="!formValid.password">
          Please enter your password
        </p>
      </div>
      <p
        class="help is-danger"
        v-if="!formValid.authentication && mode === 'login'"
      >
        Please check your email and password.
      </p>
      <p
        class="help is-danger"
        v-if="!formValid.authentication && mode === 'signup'"
      >
        Email already in use.
      </p>
    </template>

    <template v-slot:footer>
      <div class="field is-grouped">
        <p class="control">
          <button
            class="button is-success"
            :class="{ 'is-loading': loading }"
            @click="commit"
          >
            {{ label }}
          </button>
        </p>

        <p class="control">
          <button class="button" @click="close">
            Cancel
          </button>
        </p>
      </div>
    </template>
  </base-model>
</template>

<script>
export default {
  props: ['active', 'mode'],
  emits: ['close', 'switchMode'],
  data() {
    return {
      loading: false,
      email: null,
      password: null,
      formValid: {
        email: true,
        password: true,
        authentication: true
      }
    };
  },
  computed: {
    label() {
      return this.mode === 'login' ? 'Log in' : 'Sign up';
    },
    alt_label() {
      return this.mode === 'login' ? 'Sign up' : 'Log in';
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    verifyForm() {
      this.formValid = {
        email: true,
        password: true,
        authentication: true
      };

      if (!this.validateEmail(this.email)) {
        this.formValid.email = false;
      }

      if (this.password === null || this.password.length === 0) {
        this.formValid.password = false;
      }

      if (this.formValid.email && this.formValid.password) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.loading = false;
      this.email = null;
      this.password = null;
      this.formValid = {
        email: true,
        password: true,
        authentication: true
      };
    },
    async commit() {
      this.loading = true;
      const formValidity = this.verifyForm();

      if (formValidity) {
        const payload = {
          mode: this.mode,
          email: this.email,
          password: this.password
        };

        try {
          await this.$store.dispatch('auth', payload);
          this.resetForm();
          this.$emit('close');
        } catch (err) {
          this.formValid.authentication = false;
        }
      }
      this.loading = false;
    },
    close() {
      this.resetForm();
      this.$emit('close');
    },
    switchMode(){
      this.$emit('switchMode');
    }
  }
};
</script>
