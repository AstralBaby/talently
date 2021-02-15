<template>
  <div>
    <iframe v-if='videoUrl' :src="videoUrl" width="640" height="360" frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>
import EventBus from '@/util/EventBus'

export default {
    data: () => ({
        videoUrl: 'https://player.vimeo.com/video/39619054'
    }),
    methods: {
        setProgress(payload){
            this.$store.commit('course/setProgress', payload.percent)
            .then( res => console.log(res) )
        },
        
        onEnded() {
            EventBus.$emit('videoplayer-ended')
        },

        getVideoURL(payload) {
            //prevent same origin iframe error by using same domain
            let url = payload.video_url
            let parsed = url.replace('https://vimeo.com/', 'https://player.vimeo.com/video/')
            return parsed
        }
    },
    mounted() {
        const iframe = document.querySelector('iframe')
        const Player = new Vimeo.Player(iframe);
        
        const $this = this

        EventBus.$on('playlist:play', function(payload) {
            $this.videoUrl = $this.getVideoURL(payload)
        })

        Player.on('timeupdate', this.setProgress)
        Player.on('ended', this.onEnded)
    }
}
</script>

<style>

</style>