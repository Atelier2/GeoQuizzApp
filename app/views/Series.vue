<template>
    <Page>
        <ActionBar title="GeoQuizz" style="background-color: #ef4445"></ActionBar>

        <ScrollView>
            <FlexboxLayout orientation="vertical" class="page">
                <SeriesBox v-for="item in series" :city="item.city" :zoom="item.zoom" :nbPictures="item.nb_pictures"/>
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import SignIn from "./SignIn";
    import SeriesBox from "../components/SeriesBox";

    export default {
        name: "Series",
        components: {SeriesBox},
        data() {
            return {
                series: []
            }
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
</style>
