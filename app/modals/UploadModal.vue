<template>
    <Page>
        <StackLayout class="upload-modal">
            <ActivityIndicator v-if="!uploadDone" busy="true" class="upload-modal-activity"/>
            <Label class="upload-modal-text" v-show="uploadDone" :text="text"/>
            <Button class="upload-modal-btn" v-show="uploadDone" text="OK" @tap="$modal.close" fontSize="18"/>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "AddTodoModal",
        props: [
            "imageAsset"
        ],
        data() {
            return {
                text: null,
                uploadDone: false
            }
        },
        methods: {
            errorHandler(event) {
                this.text = `An error ${event.responseCode} occured.`;
                this.uploadDone = true;
            },

            respondedHandler() {
                this.text = "Uploaded!";
                this.uploadDone = true;
            },

            cancelledHandler() {
                this.text = "Upload was cancelled.";
                this.uploadDone = true;
            },
        },
        created(){
            global.bus.$on("uploadRequested", imageAsset => {
                let filePath = imageAsset._android !== undefined ? imageAsset._android : imageAsset._ios;
                let request = {
                    url: `https://api.imgbb.com/1/upload?key=${global.apiKey}`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream"
                    },
                    description: "Uploading image"
                };
                let params = [
                    { name: "image", filename: filePath, mimeType: "img/jpeg" }
                ];

                let upload = global.bghttpSession.multipartUpload(params, request);

                upload.on("error", this.errorHandler);
                upload.on("responded", this.respondedHandler);
                upload.on("cancelled", this.cancelledHandler);
            });
        }
    }
</script>

<style scoped>
    .upload-modal {
        background-color: #404040;
        padding: 15;
    }
    .upload-modal-btn {
        background-color: #ef4445;
        border-radius: 10;
        width: 200;
    }
    .upload-modal-activity {
        width: 100;
        height: 100;
        color: #ef4445;
    }
    .upload-modal-text {
        font-size: 18;
        padding-bottom: 10;
    }
</style>
