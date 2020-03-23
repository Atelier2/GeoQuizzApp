<template>
    <Page>
        <ActionBar title="GeoQuizz" style="background-color: #ef4445"></ActionBar>

        <FlexboxLayout class="page">
            <StackLayout class="select-list">
                <Button text="Add a photo to the global library" @tap="openCamera" class="select-button" marginBottom="40"/>
                <Button text="Add a photo to one of my series" @tap="goToSeries" class="select-button"/>
            </StackLayout>
        </FlexboxLayout>
    </Page>

</template>

<script>
    import UploadModal from "../modals/UploadModal";

    export default {
        name: "OptionSelect",
        data() {
            return {

            }
        },
        methods: {
            openCamera() {
                global.camera.requestPermissions()
                    .then(() => {
                        global.camera.takePicture({
                            width: 300,
                            height: 300,
                            keepAspectRatio: true,
                            saveToGallery: false
                        }).then(imageAsset => {
                            this.upload(imageAsset);
                        });
                    }).catch(err => {
                        alert({
                            title: "Error",
                            message: "You must give permissions to take pictures.",
                            okButtonText: "OK"
                        })
                });
            },

            upload(imageAsset) {
                this.$showModal(UploadModal, { props: { imageAsset: imageAsset} });
                global.bus.$emit("uploadRequested", imageAsset);
            },

            goToSeries() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .select-button {
        height: 100;
        padding-left: 15;
        padding-right: 15;
        border-radius: 15;
        background-color: #ef4445;
        font-size: 18;
    }
    .select-list {
        margin-left: 1;
        margin-right: 1;
        flex-grow: 2;
        vertical-align: middle;
    }
</style>
