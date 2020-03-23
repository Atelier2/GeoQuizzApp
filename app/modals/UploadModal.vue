<template>
    <Page>
        <StackLayout>
            <Label :text="text"/>
            <Button v-show="uploadDone" text="OK" @tap="$modal.close" />
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
                text: "Please wait...",
                uploadDone: false
            }
        },
        methods: {
            progressHandler() {
                this.text = "Please wait...";
            },

            errorHandler(event) {
                // TODO: improve style and ask why error 400
                console.log("error", event.responseCode);
                this.text = "An error occured.";
                this.uploadDone = true;
            },

            respondedHandler(event) {
                console.log("Upload finished!");
                let url = JSON.parse(event.data).data.url;
                this.text = `Uploaded here ${url}`;
                this.uploadDone = true;
            },

            completeHandler() {
                console.log("Server responded");
            },

            cancelledHandler() {
                console.log("Upload was cancelled.");
                this.text = "Upload was cancelled.";
                this.uploadDone = true;
            },
        },
        created(){
            global.bus.$on("uploadRequested", imageAsset => {
                console.log("upload requested listened");
                let filePath = imageAsset._android !== undefined ? imageAsset._android : imageAsset._ios;
                let fileName = filePath.substr(filePath.lastIndexOf("/") + 1);
                let task = global.bghttpSession.uploadFile(filePath, {
                    url: `https://api.imgbb.com/1/upload?key=${global.apiKey}`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream"
                    },
                    description: "Uploading " + fileName
                });
                console.log("tast", task);

                task.on("progress", this.progressHandler);
                task.on("error", this.errorHandler);
                task.on("responded", this.respondedHandler);
                task.on("complete", this.completeHandler);
                task.on("cancelled", this.cancelledHandler);
            });
        }
    }
</script>

<style scoped>

</style>
