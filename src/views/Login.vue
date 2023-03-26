<template>
    <div class="w-100 h-100 d-flex justify-center align-center ">
        <v-card width="100%" class="login-card" max-width="500px">
            <v-card-title class=" text-center">
                Login
            </v-card-title>
            <v-card-text>

                <v-text-field v-model="formData.username" variant="outlined" name="username" label="Username"
                    id="username"></v-text-field>
                <v-text-field v-model="formData.password" variant="outlined" name="password" label="Password" id="password"
                    type="password"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="tonal" color="primary" @click="login">Login</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { userStore } from '@/stores/userStore'



export default {
    name: "LoginPage",
    setup() {
        return { userStore }
    },
    data() {
        return {
            formData: {
                username: null,
                password: null
            }
        }
    },
    methods: {
        login: function () {
            const userStore = this.userStore()
            userStore.login({ ...this.formData })
                .catch(err => {
                    console.log(err);
                    alert("Invalid Credential")
                })
        }
    }
}

</script>

<style lang="scss" scoped></style>