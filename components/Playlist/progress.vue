<template>
  <div>
    <svg v-if='percentage < 10' :height="size" :width="size">
       <circle
         stroke="#DEEADA"
         :stroke-dasharray="`${circumference} ${circumference}`"
         :stroke-width="stroke"
         fill="transparent"
         :r="normalizedRadius"
         :cx="radius"
         :cy="radius"
        />
       <circle
         stroke="#30308C"
         :stroke-dasharray="`${circumference} ${circumference}`"
         :style="{strokeDashoffset: offset}"
         :stroke-width="stroke"
         fill="transparent"
         :r="normalizedRadius"
         :cx="radius"
         :cy="radius"
      />
    </svg>
    <i v-else
        :style='{width: `${size}px`, height: `${size}px`}'
        class='bx bx-check bg-primary
        h-8 w-8 rounded-full flex items-center
        justify-center text-white z-10'></i>
  </div>
</template>

<script>
export default {
    props: {
        stroke: {
            type: Number,
            default: 2.5
        },
        size: {
           type: Number,
           default: 23 
        },
        percentage: {
            type: Number,
            default: 0
        }
    },
    computed: {
        radius() {
            return this.size / 2
        },
        normalizedRadius() {
            if (this.size < 60) return this.radius - this.stroke
            return this.radius - this.stroke * 2
        },
        circumference () {
            return this.normalizedRadius * 2 * Math.PI
        },
        offset() {
            return this.circumference - (this.percentage / 10 * this.circumference)
        }
    }
}
</script>

<style>
    circle {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    }
</style>