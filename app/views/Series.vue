<template>
    <Page>
        <ActionBar title="GeoQuizz" style="background-color: #ef4445"></ActionBar>

        <GridLayout>
            <ScrollView>
                <FlexboxLayout orientation="vertical" class="page">
                    <SeriesBox v-for="item in series" :series="item" />
                </FlexboxLayout>
            </ScrollView>
            <fab v-show="seriesIds.length !== 0" @tap="takePhoto" row="1" text="✓" rippleColor="#f1f1f1" class="ok-button" />
        </GridLayout>
    </Page>
</template>

<script>
    import SignIn from "./SignIn";
    import SeriesBox from "../components/SeriesBox";
    import { take } from "../modules/PhotoModule";
    import UploadModal from "../modals/UploadModal";

    export default {
        name: "Series",
        components: {SeriesBox},
        data() {
            return {
                series: [],
                seriesIds: []
            }
        },
        methods: {
            takePhoto() {
                take(this.upload);
            },

            upload(image) {
                this.$showModal(UploadModal);
                global.bus.$emit("addToSeries", image, this.seriesIds);
            },
        },
        created() {
            global.bus.$on("seriesAdded", seriesId => {
                this.seriesIds.push(seriesId);
            });

            global.bus.$on("seriesDeleted", seriesId => {
                this.seriesIds.splice(this.seriesIds.indexOf(seriesId), 1);
            });
        },
        mounted() {
            global.axios.get(`users/${global.user.id}/series/`)
                .then(response => {
                    this.series = response.data.series;
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
        }
    }
</script>

<style scoped>
    .page {
        align-items: flex-start;
        padding: 20;
    }
    .ok-button {
        height: 70;
        width: 70;
        margin: 15;
        background-color: #ef4445;
        horizontal-align: right;
        vertical-align: bottom;
    }
</style>
