<template>
    <Page>
        <ActionBar title="GeoQuizz" style="background-color: #ef4445"></ActionBar>

        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/assets/logo.png" />
                <Label class="header" text="GeoQuizz" />

                <StackLayout class="input-field" marginBottom="25">
                    <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="email" returnKeyType="next" fontSize="18" />
                    <StackLayout class="hr-light" />
                </StackLayout>

                <StackLayout class="input-field" marginBottom="25">
                    <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Password" secure="true" v-model="password" fontSize="18" />
                    <StackLayout class="hr-light" />
                </StackLayout>

                <Button text="Sign In" @tap="signIn" class="btn btn-primary m-t-20" />
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="goToSignUp">
                <FormattedString>
                    <Span text="Don't have an account? " /><Span text="Sign Up" style="text-decoration: underline"/>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import SignUp from "./SignUp";

    export default {
        name: "SignIn",
        data() {
            return {
                email: null,
                password: null
            }
        },
        methods: {
            signIn() {
                // TODO: axios request to route /user/signin
                console.log('email', this.email);
                console.log('password', this.password);
            },

            goToSignUp() {
                this.$navigateTo(SignUp);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
