<template>
  <div class="dialog" v-if="show" @click="hideDialog" >
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: 'my-dialog',

  mixins: [toggleMixin]
}
</script>

<style scoped>
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;

    background: rgba(0, 0, 0, 0.2);
  }

  .dialog__content {
    margin: auto;
    padding: 20px 30px;
    min-width: 300px;
    min-height: 50px;
    border-radius: 12px;
    background: white;
  }
</style>
