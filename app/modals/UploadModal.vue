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
    import { uploadToImgBB } from "../modules/PhotoModule";
    import SignIn from "../views/SignIn";

    export default {
        name: "AddTodoModal",
        props: [

        ],
        data() {
            return {
                text: null,
                uploadDone: false
            }
        },
        methods: {
            uploadToGeoQuizz(image, url) {
                global.axios.post(`users/${global.user.id}/pictures/`,{
                    description: "Cool photo", // TODO: get description dynamically
                    latitude: image.location.latitude,
                    longitude: image.location.longitude,
                    link: url
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
                        }).then(() => {
                            this.$navigateTo(SignIn);
                        });
                    }
                });
            },

            ImgBBErrorHandler() {
                this.text = "An error occured!";
                this.uploadDone = true;
            }
        },
        created(){
            global.bus.$on("uploadToGlobal", image => {
                uploadToImgBB(image, this.uploadToGeoQuizz, this.ImgBBErrorHandler);
            });

            //global.bus.$on("uploadToSeries", image)
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
