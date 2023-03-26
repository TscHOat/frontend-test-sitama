<template>
    <v-app>
        <v-app-bar app>
            <v-container>
                <v-img :src="logoPath" contain height="50" />
            </v-container>
            <v-spacer></v-spacer>
            <v-btn v-if="!!auth" color="error" @click="logout">Logout</v-btn>
        </v-app-bar>
        <v-main>
            <v-container class="h-100">
                <slot name="content"></slot>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { userStore } from '@/stores/userStore'
import logoPath from '@/assets/logo-revisi-SITAMA_logo-SIP.png'
export default {
    name: "LayoutDefault",
    setup() {
        const user = userStore()
        const auth = user.user
        return { userStore, auth }
    },
    data() {
        return {
            logoPath
        }
    },
    methods: {
        logout: function () {
            const auth = this.userStore()
            return auth.logout();
        }
    }
}
</script>

<style lang="scss">
@import "vuetify/settings";


@media #{map-get($display-breakpoints, 'md-and-up')} {
    .v-app-bar img {
        width: auto !important;
    }
}
</style>