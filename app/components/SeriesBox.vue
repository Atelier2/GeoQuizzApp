<template>
    <FlexboxLayout class="series-box">
        <CheckBox :checked="isChecked" @checkedChange="isChecked = $event.value" fillColor="#ef4445" class="series-checkbox"/>
        <StackLayout>
            <Label>
                <FormattedString>
                    <Span text="city: " class="series-field"/>
                    <Span :text="series.city" class="series-info"/>
                </FormattedString>
            </Label>
            <Label>
                <FormattedString>
                    <Span text="zoom: " class="series-field"/>
                    <Span :text="series.zoom" class="series-info"/>
                </FormattedString>
            </Label>
            <Label>
                <FormattedString>
                    <Span text="pictures: " class="series-field"/>
                    <Span :text="series.nb_pictures" class="series-info"/>
                </FormattedString>
            </Label>
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
        width: 320;
        color: black;
        background-color: #c3c3c3;
        margin-bottom: 15;
        border-radius: 7;
        font-size: 15;
        padding: 5;
    }
    .series-checkbox {
        width: 30;
        margin-right: 5;
    }
    .series-info {
        font-size: 18;
        font-weight: bold;
    }
    .series-field {
        color: #3e3e3e;
        font-style: italic;
    }
</style>
