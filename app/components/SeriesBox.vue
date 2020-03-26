<template>
    <FlexboxLayout class="series-box">
        <CheckBox :checked="isChecked" @checkedChange="isChecked = $event.value" />
        <StackLayout>
            <Label :text="'city: '+series.city"/>
            <Label :text="'zoom: '+series.zoom"/>
            <Label :text="'pictures: '+series.nb_pictures"/>
        </StackLayout>
    </FlexboxLayout>
</template>

<script>
    export default {
        name: "SeriesBox",
        props: [
            "series"
        ],
        data() {
            return {
                isChecked: false
            }
        },
        watch: {
            isChecked: function (isChecked) {
                if (isChecked) {
                    global.bus.$emit("seriesAdded", this.series.id);
                } else {
                    global.bus.$emit("seriesDeleted", this.series.id);
                }
            }
        }
    }
</script>

<style scoped>
    .series-box {
        background-color: blue;
        border-width: 3;
        border-color: red;
        margin-bottom: 15;
        font-size: 18;
        padding: 5;
    }
</style>
