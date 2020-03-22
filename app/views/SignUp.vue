<template>
    <Page>
        <ActionBar title="GeoQuizz" style="background-color: #ef4445"></ActionBar>

        <ScrollView orientation="vertical">
            <FlexboxLayout class="page">
                <StackLayout class="form">
                    <Image class="logo" src="~/assets/logo.png" />
                    <Label class="header" text="GeoQuizz" />

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Firstname" autocorrect="false" autocapitalizationType="none" v-model="firstname" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Lastname" autocorrect="false" autocapitalizationType="none" v-model="lastname" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="email" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Password" secure="true" autocorrect="false" autocapitalizationType="none" v-model="password" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Confirm password" secure="true" autocorrect="false" autocapitalizationType="none" v-model="confirmPassword" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Phone number" keyboardType="phone" autocorrect="false" autocapitalizationType="none" v-model="phone" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Street number" keyboardType="number" autocorrect="false" autocapitalizationType="none" v-model="streetNumber" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Street name" autocorrect="false" autocapitalizationType="none" v-model="streetName" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="City" autocorrect="false" autocapitalizationType="none" v-model="city" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" style="placeholder-color: rgba(255, 255, 255, 0.5);" hint="Zip code" keyboardType="number" autocorrect="false" autocapitalizationType="none" v-model="zipCode" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <Button text="Sign Up" @tap="signUp" class="btn btn-primary m-t-20" />
                </StackLayout>

                <Label class="login-label sign-up-label" @tap="goToSignIn">
                    <FormattedString>
                        <Span text="Already have an account? " /><Span text="Sign In" style="text-decoration: underline"/>
                    </FormattedString>
                </Label>
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import SignIn from "./SignIn";

    export default {
        name: "SignUp",
        data() {
            return {
                firstname: null,
                lastname: null,
                email: null,
                password: null,
                confirmPassword: null,
                phone: null,
                streetNumber: null,
                streetName: null,
                city: null,
                zipCode: null
            }
        },
        methods: {
            signUp() {
                // TODO: axios request to route /user/signin
                console.log('email', this.email);
                console.log('password', this.password);
            },

            goToSignIn() {
                this.$navigateTo(SignIn);
            }
        }
    };
</script>

<style scoped lang="scss">
    .logo {
        margin-top: 15;
    }
    .header {
        margin-bottom: 35;
    }
    .sign-up-label {
        margin-top: 30;
    }
</style>
