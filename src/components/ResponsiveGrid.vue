<template>
  <div class="responsive-grid">
    <div
      class="responsive-grid--content"
      :style="{
        gridGap: gridGap
      }"
    >
      <slot class="responsive-grid--element" />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        gridGap: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixins.scss";

.responsive-grid {
  width: 100%;
}
.responsive-grid--content {
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-flow: dense;
  align-items: center;
  justify-items: center;

  @include sm {
    grid-template-columns: repeat(3, 1fr);
  }
  @include md {
    grid-template-columns: repeat(4, 1fr);
  }
  @include lg {
    grid-template-columns: repeat(5, 1fr);
  }
  @include xl {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>