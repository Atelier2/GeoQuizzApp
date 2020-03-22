<template>
    <SignIn></SignIn>
</template>

<script>
    import SignIn from "../views/SignIn";

    export default {
        components: {
            SignIn
        },
        methods: {

        }
    };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
