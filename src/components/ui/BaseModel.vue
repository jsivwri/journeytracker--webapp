<template>
  <div class="modal is-clipped" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
       <slot name="header"></slot>
      </header>
      <section class="modal-card-body">
        <slot> </slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
    props: ['active']
}
</script>