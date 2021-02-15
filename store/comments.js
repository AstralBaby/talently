import { ApiRequest, Endpoints } from '@/util/api'
import EventBus from '@/util/EventBus'

// Initialize API Configuration.
export const plugins = [ApiRequest]
export const courseContent = new ApiRequest(Endpoints.CONTENT)
export const courseComments = new ApiRequest(Endpoints.COMMENT)


export const state = () => ({
    comments: []
})

export const mutations = {
    setComments(state, payload) {
        if (!payload) return false
        state.comments = payload
        //order comments by date
        state.comments.sort(function(a,b){
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
    },

    addComment(state, payload) {
        if (!payload) return false
        state.comments.push(payload)
        //order again
        state.comments.sort(function(a,b){
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
    },

    setComment(state, payload) {
        if (!payload.id) return false
        let comment = state.comments.find(comment => comment.id === payload.id)
        if(!comment) return false
        
        //get the comment by its id and change its content
        state.comments.map(comment => {
            if (comment.id === payload.id)
            comment.content = payload.content
        })
    },

    removeComment(state, id) {
        state.comments = state.comments.filter(comment => comment.id != id)
    }
}

export const actions = {
    load({ state, commit }) {
        courseContent.get('1/comments').then(res => {
            commit('setComments', res.comments)
        })
    },

    editComment({ commit }, payload) {
        courseComments.post(`${payload.id}/update`, {content: payload.content})
        .then(
            commit('setComment', payload)
        ).catch(err => {
            alert("Hubo un error al actualizar tu comentario.")
        })
    },
    
    deleteComment({ commit }, id) {
        courseComments.delete(id).then(response => {
            commit('removeComment', id)
        }).catch(err => alert("Ocurrio un error al eliminar tu comentario, intentalo de nuevo"))
    },

    addComment({ commit }, comment) {
        if (!comment) return false

        let body = {
            user_id: 4,
            content: comment,
            content_id: 1
        }

        courseComments.post('create', body).then( res => {
            commit('addComment', {
                user: {
                    name: 'Yo',
                },
                ...res.message
            })
        })
        .catch(err => alert("Ocurrio un error al publicar tu comentario!"))
    }
}
