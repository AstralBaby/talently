<template>
  <div class="h-screen w-screen flex justify-center items-center">
      <div class="w-1/4 bg-white p-5">
        <img src="@/assets/logo.png" class="h-5 my-5 mx-auto" alt="">
        <div class="py-3 text-sm">
            <div class="mb-2">
                <div class="mb-1 font-medium">Email</div>
                <input type="text" v-model='email' :class='{"border-red-500": error}'>
            </div>
            <div class="mb-3">
                <div class="flex items-center mb-1">
                    <div class="font-medium">Password</div>
                    <div class="flex-grow"></div>
                    <div class='text-blue-500'>Se te olvido tu clave ?</div>
                </div>
                <input type="text" v-model='password' :class='{"border-red-500": error}'>
            </div>
        </div>
        <button
            @click='login()'
            class="bg-indigo-700 py-2 rounded-md shadow text-white font-medium w-full">
            <template v-if="!isLogging">
                Iniciar Sesion
            </template>
            <i v-else class='bx bx-loader-circle bx-spin'></i>
        </button>
        <div class="text-sm mt-5 text-center text-black">
            Nuevo en Talently?
            <a class="text-indigo-600 font-medium" href="">
                Crea una cuenta
            </a>
        </div>
        <div
        v-show='error'
        class="text-sm border transition-all p-3 mt-3 border-red-500 rounded-md flex text-red-700">
            <div></div>
            <div>Los datos ingresados no coindicen con una cuenta de Talently.</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        email: '',
        password: '',
        isLogging: false,
        error: false
    }),
    methods: {
        async login() {
            if (!this.email || !this.password.length) return false
            if (this.isLogging) return false

            this.error = false
            this.isLogging = true
            
            try {
                let response = await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
            } catch (error) {
                if(error.response.status === 401) this.error = true
            } finally {
                this.isLogging = false
            }
        }
    }
}
</script>

<style>
input {
    @apply px-2 py-2 border rounded-sm w-full border-gray-300
}
</style>