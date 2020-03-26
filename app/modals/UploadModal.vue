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
        data() {
            return {
                text: null,
                uploadDone: false
            }
        },

        created(){
            global.bus.$on("uploadRequested", image => {
                let filePath = image.imageAsset._android !== undefined ? image.imageAsset._android : image.imageAsset._ios;
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

                upload.on("responded", event => {
                    global.axios.post(`users/${global.user.id}/pictures/`,{
                        description: "Cool photo", // TODO: get description dynamically
                        latitude: image.location.latitude,
                        longitude: image.location.longitude,
                        link: JSON.parse(event.data).data.url // TODO: make this ugly code readable
                    }).then(response => {
                        this.text = "Uploaded!";
                        this.uploadDone = true;
                    }).catch(err => {
                        let errorResponse = JSON.parse(err.response.request._response);
                        if (errorResponse.error === 401) {
                            alert({
                                title: "Error",
                                message: "Your session expired, you must sign back in.",
                                okButtonText: "Sign In"
                            });
                        }
                    });
                });

                upload.on("error", event => {
                    this.text = `An error ${event.responseCode} occured.`;
                    this.uploadDone = true;
                });

                upload.on("cancelled", () => {
                    this.text = "Upload was cancelled.";
                    this.uploadDone = true;
                });
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
