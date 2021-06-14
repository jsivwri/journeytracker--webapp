<template>
  <base-model :active="active">
    <template v-slot:header> Report an issue 🐛 </template>

    <template v-slot:default>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            :class="{
              'is-danger': !email.valid
            }"
            type="email"
            placeholder="Email"
            v-model.trim="email.data"
          />
        </div>
        <p class="help is-danger" v-if="!email.valid">
          Please enter your email
        </p>
      </div>

      <div class="field">
        <label class="label">Issue</label>
        <div class="control">
          <textarea
            class="textarea"
            :class="{
              'is-danger': !issue.valid
            }"
            rows="4"
            cols="50"
            placeholder="What's the problem?"
            v-model="issue.data"
          />
        </div>
        <p class="help is-danger" v-if="!issue.valid">
          Please enter your issue
        </p>
      </div>
    </template>

    <template v-slot:footer>
      <div class="field is-grouped">
        <p class="control">
          <button
            class="button is-success"
            :class="{ 'is-loading': loading }"
            @click="commit"
          >
            Send
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
  props: ['active'],
  emits: ['close'],
  data() {
    return {
      loading: false,
      email: {
        data: '',
        valid: true
      },
      issue: {
        data: '',
        valid: true
      }
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    verifyForm() {
      this.email.valid = true;
      this.issue.valid = true;

      if (!this.validateEmail(this.email.data)) {
        this.email.valid = false;
      }

      if (this.issue.data.length < 1) {
        this.issue.valid = false;
      }

      if (this.email.valid && this.issue.valid) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.loading = false;
      this.email = {
        data: '',
        valid: true
      };
      this.issue = {
        data: '',
        valid: true
      };
    },
    async commit() {
      this.loading = true;
      const formValidity = this.verifyForm();

      if (formValidity) {
        const payload = {
          email: this.email.data,
          issue: this.issue.data
        };
    
        try {
          await this.$store.dispatch('bugs/createIssue', payload);
          this.resetForm();
          this.$emit('close');
        } catch (err) {
          console.log(err);
        }
      }
      this.loading = false;
    },
    close() {
      this.resetForm();
      this.$emit('close');
    }
  }
};
</script>
