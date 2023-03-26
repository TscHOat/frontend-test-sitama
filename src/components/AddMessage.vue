<template>
    <v-dialog v-model="modal" scrollable persistent max-width="500px" :retain-focus="false">
        <template v-slot:activator="{ props }">
            <v-btn flat color="primary" v-bind="props">Add</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="h1">Add Messages</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="form.title" variant="outlined" label="Title"></v-text-field>

                    <v-select :items="department" v-model="form.department" @update:model-value="changeDepartmen"
                        item-value="value" item-title="label" label="Department" variant="outlined"></v-select>

                    <v-select :items="employe?.filter(d => d.department === (form.department ?? null)) ?? []"
                        @update:model-value="changeAssign" item-value="value" :disabled="form?.department == null"
                        item-title="label" v-model="form.assign" label="Assign" variant="outlined"></v-select>

                    <v-select
                        :items="employe?.filter(d => d.department === form.department && d.value !== form.assign) ?? []"
                        item-value="value" :disabled="form?.assign === null" item-title="label" v-model="form.cc" label="CC"
                        variant="outlined"></v-select>

                    <v-file-input v-model="form.attachment" @update:model-value="changeAttachment" prepend-icon=""
                        variant="outlined" label="Attachment">
                        <template v-if="(previewImage ?? null) !== null" v-slot:append>
                            <v-icon @click="openPreview">
                                mdi-eye
                            </v-icon>
                        </template>
                    </v-file-input>

                    <ckeditor :editor="editor" v-model="form.description" :config="editorConfig" style="z-index: 999;">
                    </ckeditor>



                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submitForm">Submit</v-btn>
                <v-btn color="red" text @click="() => modal = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="modalPreview" id="modal-preview" max-width="80vw" transition="dialog-transition">
        <img :src="previewImage" />


    </v-dialog>
</template>

<script>
import Editor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios'


export default {
    name: "AddMessage",
    components: {
        ckeditor: CKEditor.components,
    },
    data() {
        return {
            editor: Editor,
            baseUrl: `${import.meta.env.VITE_API_URL}/inbox`,
            department: [
            ],
            employe: [
            ],
            form: {
                title: null,
                description: '',
                attachment: null,
                department: null,
                assign: null,
                cc: null,
            },
            editorConfig: {
                placeholder: "Description",
            },
            modal: false,
            modalPreview: false,
            previewImage: null,

        }
    },
    methods: {
        submitForm: function () {
            axios.post(this.baseUrl, this.form).then(res => {

            })
                .catch(err => console.error(err))
        },
        changeDepartmen: function () {
            this.form.assign = null
            this.form.cc = null
        },
        changeAssign: function () {
            this.form.cc = null
        },
        changeAttachment: function () {
            if (!(this.form?.attachment?.[0]?.type?.match('image.*') ?? false)) {
                this.previewImage = null
                return;
            }
            const file = this.form?.attachment?.[0]
            this.previewImage = URL.createObjectURL(file)

        },
        openPreview: function () {
            this.modalPreview = true
        }
    },
    async mounted() {
        try {
            const employe = await axios.get("http://localhost:8001/api/dropdown/user")
            const department = await axios.get("http://localhost:8001/api/dropdown/department")



            this.employe = employe.data.data
            this.department = department.data.data
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="scss" >
.ck-content {
    height: 200px;
}

#modal-preview img {
    max-width: 80vw;
    max-height: 90vh;
    object-fit: contain;
    margin: auto;
}
</style>