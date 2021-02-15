<template>
    <div>
        <Video :class="{'bg-indigo-300': v.id === currentEpisode}"
        @click.native='changeEpisode(v.id)'
        :title='v.title' :progress='v.progress'
        :key='v.id' v-for="v in episodes"/>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import EventBus from '@/util/EventBus'

export default Vue.extend({
    data: () => ({
    }),
    methods: {
        //Playlist control logic.
        changeEpisode(id) {
            this.$store.dispatch('course/updateCurrentEpisode', id)
            EventBus.$emit('playlist:play', this.getCurrentEpisode)
        },
        nextEpisode() {
            //prevent modification of the state using the spread operator
            if ([...this.episodes].pop().id === this.nextEpisode) return false

            let currentIndex = 0

            //get the index of the current episode and check for the
            //next episode based on its index
            this.episodes.map((ep, index) => {
                if (ep.id === this.getCurrentEpisode.id)
                currentIndex = index
            }) 

            const nextEpisode = this.episodes[++currentIndex].id

            this.$store.dispatch('course/updateCurrentEpisode', nextEpisode)
            //notify videoplayer the video has changed
            EventBus.$emit('playlist:play', this.getCurrentEpisode)
        },

        startPlaylist() {
            //onMount playlist behavior
            //by default, play the first incomplete episode
            let episode = this.episodes.find(ep => ep.progress < 10)
            if (episode){
                //if content, then start playing
                this.$store.dispatch('course/updateCurrentEpisode', episode.id)
                EventBus.$emit('playlist:play', episode)
            }
        }
    },
    computed: {
        ...mapState('course', ['episodes', 'currentEpisode']),
        ...mapGetters('course', ['getCurrentEpisode'])
    },
    mounted() {
        EventBus.$on('videoplayer-ended', this.nextEpisode)
        EventBus.$on('content-loaded', this.startPlaylist)
    }
})
</script>

<style>

</style>