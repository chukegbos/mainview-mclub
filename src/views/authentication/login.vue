<template>
  <div class="container">
    <div class="row mt-4">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <b-img fluid :src="imgUrl" alt="Login V2" class="center" />
              <b-card-text class="my-2 text-center">
                Welcome, login to you school to proceed;
              </b-card-text>

              <!-- form -->
              <validation-observer ref="loginValidation">
                <b-form class="auth-login-form my-2" @submit.prevent>
                  <!-- email -->
                  <b-form-group label="Username" label-for="login-email">
                    <validation-provider
                      #default="{ errors }"
                      name="username"
                      rules="required"
                    >
                      <b-form-input
                        id="login-username"
                        v-model="username"
                        :state="errors.length > 0 ? false : null"
                        name="login-usernme"
                        placeholder="Enter your username"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                  <!-- forgot password -->
                  <b-form-group>
                    <div class="d-flex justify-content-between mt-2">
                      <label for="login-password">Password</label>
                      <b-link :to="{ name: 'auth-forgot-password-v2' }">
                        <small>Forgot Password?</small>
                      </b-link>
                    </div>
                    <validation-provider
                      #default="{ errors }"
                      name="Password"
                      rules="required"
                    >
                      <b-input-group
                        class="input-group-merge"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      >
                        <b-form-input
                          id="login-password"
                          v-model="password"
                          :state="errors.length > 0 ? false : null"
                          class="form-control-merge"
                          :type="passwordFieldType"
                          name="login-password"
                          placeholder="············"
                        />
                        <b-input-group-append is-text>
                          <feather-icon
                            class="cursor-pointer"
                            :icon="passwordToggleIcon"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                  <!-- checkbox -->
                  <b-form-group>
                    <b-form-checkbox
                      id="remember-me"
                      v-model="status"
                      name="checkbox-1"
                    >
                      Remember Me
                    </b-form-checkbox>
                  </b-form-group>
                  
                  <!-- submit buttons -->
                  <b-button
                    v-if="!isLoading"
                    type="submit"
                    variant="danger"
                    block
                    @click="validationForm"
                  >
                    Sign in
                  </b-button>
                  <b-button
                    v-else
                    type="button"
                    variant="warning"
                    block
                    @click="validationForm"
                  >
                    <b-spinner small label="Small Spinner" variant="white"></b-spinner>
                  </b-button>
                  
                </b-form>
              </validation-observer>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BSpinner,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      username: "",
      sideImg: require("@/assets/images/logo/logoo.png"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      isLoading:false
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/logo/logoo.png");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  created() {},
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        let query = new FormData();
        let dis = this;
        query.append("username", dis.username);
        query.append("password", dis.password);
        if (success) {
          let dis = this;
          dis.isLoading = true;
          this.$store
            .dispatch("Auth/LOGIN", { query })
            .then((resp) => {
              dis.isLoading = false;
              if (!resp.data) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: "Oops",
                    icon: "XIcon",
                    variant: "error",
                  },
                });
                return false;
              }
                this.$forceUpdate();
                this.text = "Login Successful";
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: `Voila`,
                    text: `You are logged in successfull`,
                    icon: "HomeIcon",
                    variant: "success",
                  },
                });
                this.$router.push({ name: "Home" });
                return true;
              
            })
            .catch((err) => {
              dis.isLoading = false;
              console.log(err);
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "An Error Occured",
                  icon: "XIcon",
                  variant: "errror",
                },
              });
            });
        
        }
      });
    },
  },
};
</script>

<style lang="scss">
  @import "@core/scss/vue/pages/page-auth.scss";
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
</style>
