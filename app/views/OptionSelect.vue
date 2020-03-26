<template>
    <Page>
        <ActionBar title="GeoQuizz" style="background-color: #ef4445"></ActionBar>

        <FlexboxLayout class="page">
            <StackLayout class="select-list">
                <Button text="Add a photo to the global library" @tap="takePhoto" class="select-button" marginBottom="40"/>
                <Button text="Add a photo to one of my series" @tap="goToSeries" class="select-button"/>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import UploadModal from "../modals/UploadModal";
    import Series from "./Series";
    import { take } from "../modules/PhotoModule";

    export default {
        name: "OptionSelect",
        methods: {
            takePhoto() {
                take(this.upload);
            },

            upload(image) {
                this.$showModal(UploadModal);
                global.bus.$emit("uploadToGlobal", image);
            },

            goToSeries() {
                this.$navigateTo(Series);
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
