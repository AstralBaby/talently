<template>
  <div class="bg-white p-3 rounded-md flex">
        <div class="pr-3">
            <i class='bx bx-user h-10 w-10 rounded-full
            bg-blue-700 text-white text-lg flex items-center justify-center'></i>
        </div>
        <textarea
            @keydown.enter.prevent='submitComment()'
            class="bg-gray-200 flex-grow rounded-md px-3 py-2"
            placeholder="Agregar un comentario"
            resizable='none' rows="1"
            v-model='content'></textarea>
    </div>
</template>

<script>
export default {
    data: () => ({
        content: ""
    }),
    methods: {
        submitComment() {
            if(!this.content) return false
            this.$emit('submit', this.content)
            this.content = ""
        }
    }
}
</script>

<style>

</style>