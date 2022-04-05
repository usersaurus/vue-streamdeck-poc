<template>
  <div class="buttons">
    <responsive-grid grid-gap="20px 52px">
      <function-button
        :btn-action-active="{
          action: 'startStream'
        }"
        :btn-action-inactive="{
          action: 'stopStream'
        }"
        icon="https://cdn.iconscout.com/icon/free/png-256/twitch-16-569328.png"
        @clicked="handleButtonClick"
      />
      <function-button
        :btn-action-active="{
          action: 'changeScene',
          payload: { sceneName: 'Full preview'} 
        }"
        icon="https://findicons.com/files/icons/2315/default_icon/256/media_pause_inv.png"
        @clicked="handleButtonClick"
      />
      <function-button
        :btn-action-active="{
          action: 'changeScene',
          payload: { sceneName: 'Full preview start' } 
        }"
        icon="https://cdn.iconscout.com/icon/free/png-256/soon-arrow-37886.png"
        @clicked="handleButtonClick"
      />
      <function-button
        :btn-action-active="{
          action: 'changeScene',
          payload: { sceneName: 'Cam + switch Pokemon'}
        }"
        icon="https://styles.redditmedia.com/t5_x9rhd/styles/communityIcon_5fnm60l7hwi41.png?width=256&s=a47c424e445ec482829ec180275d5626ab9b6705"
        @clicked="handleButtonClick"
      />
    </responsive-grid>
  </div>
  <div
    class="stream-status"
    :class="{active: streamActive}"
  >
    {{streamActive ? 'ON AIR' : 'OFFLINE'}}
  </div>

  <div
    class="current-scene"
    :class="{active: streamActive}"
  >
    {{ currentScene }}
  </div>
</template>

<script>
import FunctionButton from './components/FunctionButton.vue'
import ResponsiveGrid from './components/ResponsiveGrid.vue'
import obs from './api/OBSWebSocket'
import { onBeforeMount, ref } from 'vue'

export default {
  components: {
    FunctionButton,
    ResponsiveGrid
  },
  setup() {
    let obsFactory
    let streamActive = ref(false)
    let currentScene = ref('')

    onBeforeMount(async () => {
      // obs
      obsFactory = await obs()
      const callback = (data) => {
        console.log(data);
      };

      const scenes = await obsFactory.utils.getScenes()
      currentScene.value = scenes.currentScene

      obsFactory.obs.on('StreamStarting', (data) => callback(data));
      obsFactory.obs.on('StreamStarted', () => {
        streamActive.value = true
      });
      obsFactory.obs.on('StreamStopping', (data) => callback(data));
      obsFactory.obs.on('StreamStopped', () => {
        streamActive.value = false
      });
      obsFactory.obs.on('SwitchScenes', data => {
          currentScene.value = data.sceneName
      });
    })    
    
    const handleButtonClick = (ev) => {
      obsFactory.actions[ev.action](ev.payload)
    }

    return {
      handleButtonClick,
      streamActive,
      currentScene
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: #2c2f33;
  height: 100vh;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #23272a;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
}
.stream-status {
  background-color: #cbffcb;
  margin-top: 50px;
  padding: 20px;
  border-radius: 5px;
  font-weight: 700;
  &.active {
    background-color: palevioletred;
  }
}

.current-scene {
  background-color: #6441a4;
  margin-top: 50px;
  padding: 20px;
  border-radius: 5px;
  font-weight: 700;
  color: white;
}
</style>