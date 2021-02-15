<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="talently logo" class="logo">
    <div class="flex py-10 h-screen">
      <div class="w-2/3">
        <div class="rounded-t-md video-player">
          <Videoplayer @ended='onEnded()'/>
          <div class="bg-white rounded-b-md p-5 text-black" v-if="getCurrentEpisode">
            <div class="text-lg font-medium mb-3">
              {{getCurrentEpisode.title || 'Cargando...'}}
            </div>
              {{getCurrentEpisode.description || 'Por favor, espere'}}
          </div>
          <Comments/>
        </div>
      </div>
      <div class="w-1/3 pl-5">
        <div class="bg-white rounded-sm py-5 h-full overflow-y-auto shadow-lg">
          <div class="text-lg font-medium text-black px-4 pb-2">
            Contenido
          </div>
          <Playlist />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  methods: {
    ...mapActions({
        loadEpisodes: 'course/load',
        loadComments: 'comments/load'
      })
  },
  computed: {
    ...mapGetters('course', ['getCurrentEpisode'])
  },
  mounted() {
    this.loadEpisodes()
    this.loadComments()
  }
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  padding-left: 10em;
  padding-top: 20px;
  padding-right: 10em
}
.video-player {
}
.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
