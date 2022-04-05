<template>
  <div
    class="button"
    :class="{ active }"
    @click="handleClick"
  >
    <div
      class="button--icon"
      :style="{
        backgroundImage: `url(${buttonIcon})`
      }"
    />
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    },
    btnActionActive: {
      type: Object,
      required: true
    },
    btnActionInactive: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['clicked'],
  setup(props, { emit }) {
    const active = ref(false)

    const actionActive = () => {
      emit('clicked', props.btnActionActive)
    }

    const actionInactive = () => {
      emit('clicked', props.btnActionInactive)
    }

    const handleClick = () => {
      if (active.value) {
        actionInactive()
      } else {
        actionActive()
      }

      active.value = props.btnActionInactive ? !active.value : false
    }

    return {
      buttonIcon: props.icon,
      active,
      handleClick
    }
  }
}
</script>

<style lang="scss">
.button {
  background-color: transparent;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  display: flex;
  width: fit-content;
  padding: 10px;
  box-shadow: 0px 0px 6px 2px #cbffcb;
  &.active {
    box-shadow: none;
    border: 2px solid #90b990;
    background-color: #cbffcb;
  }
}

.button--icon {
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-size: cover;
}
</style>