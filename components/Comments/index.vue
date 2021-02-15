<template>
    <div class="rounded-b-md mt-10 text-black pb-10">
        <div class="text-lg font-medium mb-2">
            Comentarios
        </div>
        <Writer @submit='addComment($event)' class="mb-3"/>
        <template v-if='comments'>
            <Comment
                @change="onEdit($event, entry.id)"
                @click:delete="onDelete(entry.id)"
                :new='entry.isNew'
                class="my-3"
                :key='entry.id'
                v-for='entry in comments'
                :data='entry'/>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('comments', ['comments'])
    },
    methods: {
        ...mapActions({
            editComment: 'comments/editComment',
            addComment: 'comments/addComment',
            deleteComment: 'comments/deleteComment'
        }),

        onEdit(newComment, id) {
            this.editComment({content: newComment, id: id})
        },

        onDelete(comment) {
            this.deleteComment(comment)
        },

        onAddComment(content) {
            this.addComment(content)
        }
    }
}
</script>

<style>

</style>