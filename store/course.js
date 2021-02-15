import { ApiRequest, Endpoints } from '@/util/api'
import EventBus from '@/util/EventBus'

// Initialize API Configuration.
export const plugins = [ApiRequest]
export const courseContent = new ApiRequest(Endpoints.CONTENT)


export const state = () => ({
    episodes: [],
    currentEpisode: null,
})


export const mutations = {
    setProgress(state, payload){
        //multiply progress time by our base percentage.
        let newProgress = payload * 10
        let ep = state.episodes.find(ep => ep.id == state.currentEpisode)
        
        //update only if the progress is greater than the current one.
        if(ep.progress > newProgress) return false
        ep.progress = newProgress
    },

    setCurrentEpisode(state, id){
        if (state.currentEpisode === id) return false
        state.currentEpisode = id
    },

    setEpisodes(state, payload) {
        if(!payload) return false
        state.episodes = payload
    }
}

export const actions = {
    updateCurrentEpisode({ state, dispatch, commit }, payload) {
        if (state.currentEpisode) dispatch('updateProgress')
        commit('setCurrentEpisode', payload)
    },

    updateProgress({ state }){
        //SOLO GUARDANDO COMO COMPLETADO PARA NO HACER MULTIPLES CONSULTAS AL SERVIDOR,
        //EN PRODUCCION SE PUEDE ACOPLAR ESTA ACTION AL EVENTBUS DEL REPRODUCTOR DE VIDEO
        //O SIMPLEMENTE PUEDE SER ACOPLADA PARA ACTUALIZARSE CADA CIERTO PORCENTAJE O TIEMPO.
        courseContent.post(`${state.currentEpisode}/progress`, { progress: 10 })
        .then(res => console.log(res))
    },

    load({ commit }) {
        courseContent.get().then(res => {
            commit('setEpisodes', res.content)
            EventBus.$emit('content-loaded')
        }).catch(error => {
            if(error.response.status === 401) window.location.reload()
            
        })
    }

}

export const getters = {
    getCurrentEpisode: state => {
        return state.episodes.find(ep => ep.id === state.currentEpisode);
    }
}