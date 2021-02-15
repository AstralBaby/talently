<template>
  <div class="bg-white p-3 rounded-md flex">
        <div class="pr-3">
            <i class='bx bx-user h-10 w-10 rounded-full
            bg-gray-700 text-white text-lg flex items-center justify-center'></i>
        </div>
        <div class="flex-grow">
            <div class='flex items-center'>
                <div class='font-medium pr-3'>
                    {{data.user.name || "Usuario"}}
                </div>
                <div class='text-gray-600 text-sm'>{{ data.updated_at | toDate }}</div>
                <div class='flex-grow'></div>
                <div class='relative'>
                    <i
                    @click='menu = !menu'
                    class='bx bx-dots-horizontal-rounded
                    cursor-pointer
                    text-lg text-gray-600'></i>
                    <div
                        v-show="menu"
                        @click='menu = false'
                        class='rounded-md py-2 absolute bg-gray-100
                        shadow-lg font-medium z-10'>
                        <div
                            @click="openEditor()"
                            class='p-3 hover:bg-gray-200 flex
                            items-center cursor-pointer'>
                            <i class='bx bxs-pencil mr-2'></i> Editar
                        </div>
                        <div 
                            @click="$emit('click:delete')"
                            class='text-red-600 p-3 hover:bg-gray-200 flex
                            items-center cursor-pointer'>
                            <i class='bx bxs-trash mr-2'></i> Eliminar
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-sm mt-2">
                <template v-if="!isEditing">
                    {{ data.content }}
                </template>
                <textarea v-else
                    @keydown.esc='cancelEdit()'
                    @keydown.enter.prevent='submitEdit()'
                    class="bg-gray-200 w-full rounded-md px-3 py-2"
                    placeholder="Presiona ESC para salir del editor"
                    resizable='none'
                    v-model='newComment'>
                </textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        menu: false,
        comment: '',
        isEditing: false,
    }),
    props: {
        data: {
            type: [Array, Object],
            default: () => ({})
        }
    },
    computed: {
        //local copy of comment content
        newComment: {
            get: function() {
            //by default filled with the original data
            //the local model will stay empty if the user didnt made changes
            if (!this.comment)
            return this.data.content

            return this.comment
            },
            set: function(value) {
                this.comment = value
            }
        }
    },
    methods: {
        openEditor() {
            this.isEditing = true
        },
        cancelEdit() {
            this.isEditing = false
        },
        submitEdit() {
            //if no changes, prevent event
            if (!this.comment) return false
            this.$emit('change', this.comment)
            //In real-world projects should wait for response.
            this.isEditing = false
        }
    },
    filters: {
        toDate(input) {
            if (!input) return false
            const date = new Date(input)

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            if(month < 10){
                return `${day}-0${month}-${year}`
            }else{
                return `${day}-${month}-${year}`
            }
        }
    }
}
</script>

<style>

</style>