<template>
    <StackLayout class="series-box">
        <Label :text="'city: '+city"/>
        <Label :text="'zoom: '+zoom"/>
        <Label :text="'pictures: '+nbPictures"/>
    </StackLayout>
</template>

<script>
    export default {
        name: "SeriesBox",
        props: [
            "city",
            "zoom",
            "nbPictures"
        ]
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
