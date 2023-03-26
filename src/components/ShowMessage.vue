<template>
    <v-dialog scrollable persistent max-width="500px" :retain-focus="false">
        <v-card>
            <v-card-title>
                <span class="h1">Messages</span>
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
</template>

<script>
import Editor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios'

export default {
    name: "ShowMessage",
    components: {
        ckeditor: CKEditor.components,
    },
    props: ['isOpen', 'showData'],
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
            modalPreview: false,
            previewImage: null,
        }
    }
}
</script>

<style lang="scss" scoped></style>