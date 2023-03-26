<template>
    <v-container class="h-100">
        <v-row>
            <v-col>
                <v-container class="w-100 d-flex">
                    <v-spacer></v-spacer>
                    <AddMessage />
                </v-container>

            </v-col>
        </v-row>
        <v-row class="fill-height">
            <v-col>
                <v-data-table :headers="headers" :items="inbox" class="elevation-1">
                    <template v-slot:item.number="{ index }">
                        <strong>
                            {{ index + 1 }}

                        </strong>
                    </template>
                    <template v-slot:item.action="{ index, item }">
                        <v-btn icon="mdi-dots-vertical" variant="plain" @click="() => showingData(item.raw)"></v-btn>
                        <v-btn icon="mdi-delete" color="danger" variant="plain" @click="() => deleteData(item.raw)"></v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>

    <!-- dialog for show -->
    <!-- <ShowMessage v-bind:isOpen="isOpen" v-bind:showData="showData"></ShowMessage> -->
</template>

<script>


import AddMessage from '@/components/AddMessage.vue'
import ShowMessage from '@/components/ShowMessage.vue'
import axios from 'axios';
import router from '@/router'

import { showStore } from '@/stores/showStore'

export default {

    name: "InboxView",
    setup() {
        return { showStore: showStore() }
    },
    components: {
        AddMessage,
        ShowMessage
    },
    data() {
        return {
            showData: null,
            isOpen: false,
            isLoadingShow: false,
            itemsPerPage: 10,
            baseUrl: `${import.meta.env.VITE_API_URL}/inbox`,
            headers: [
                { title: 'No', key: 'number' },
                { title: 'Department', key: 'department' },
                { title: 'Asigned', key: 'assign' },
                { title: 'CC', key: 'cc' },
                { title: 'Title', key: 'title' },
                { title: 'Action', key: 'action' },
            ],
            inbox: [

            ]
        }
    },
    methods: {
        showingData: function (d) {
            console.log(d);
            this.showStore.showData = d
            this.showStore.isOpen = true
        },
        loadData: function () {
            axios.get(this.baseUrl).then(ress => {
                this.inbox = ress.data.data
            })
        },
        deleteData: function (data) {
            axios.delete(this.baseUrl + "/" + data.id).then(ress => {
                console.log(ress);
                router.go()
            })
        }
    },
    beforeMount() {
        this.loadData()
    }
}
</script>

<style lang="scss"></style>