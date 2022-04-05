import OBSWebSocket from 'obs-websocket-js/dist/obs-websocket'

const ADDRESS = 'localhost:4444'
const PASSWORD = 'password'

export default async () => {
    const obs = new OBSWebSocket()
    await obs.connect({ address: ADDRESS, password: PASSWORD })    

    return {
        obs,
        utils: {
            getScenes: () => obs.send('GetSceneList'),
        },
        actions: {
            changeScene: sceneName => {
                obs.send('SetCurrentScene', {
                    'scene-name': sceneName.sceneName
                })
            },
            startStream: () => {
                obs.send('StartStreaming')
            },
            stopStream: () => {
                obs.send('StopStreaming')
            }
        }
    }
}

