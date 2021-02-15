<template>
    <div class="flex py-3 items-center px-4 cursor-pointer">
        <div class="video flex-shrink-0 bg-black rounded-md flex
            justify-center items-center">
            <i class='bx bx-right-arrow bg-gray-700
                h-8 w-8 rounded-full flex items-center
                justify-center text-white z-10'></i>
        </div>
        <div class="px-3 flex-grow overflow-hidden">
            <div class="text-black tracking-tight truncate">{{title}}</div>
            <div class="text-sm text-gray-700">{{duration}}</div>
        </div>
        <div class="flex-shrink-0">
            <Progress :percentage='progress'/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        title: {
            type: String,
            default: 'Undefined'
        },
        duration: {
            type: Number,
            default: 0
        },
        progress: {
            type: Number,
            default: 0
        }
    }
})
</script>

<style>
.video {
    width: 109px;
    height: 61px
}
</style>