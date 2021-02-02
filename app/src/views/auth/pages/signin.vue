<template>
  <div>
    <v-img :src="background">
      <div
        class="d-flex flex-column justify-center align-center"
        style="height: 100%; width: 100%;"
      >
        <div style="width: 100%;" class="flex-grow-1 d-flex align-center">
          <v-row justify="center">
            <v-col cols="12" md="4" lg="3">
              <v-hover v-slot:default="{ hover }" v-if="!isLogged">
                <v-card :elevation="hover ? 16 : 2" class="rounded-lg pa-1">
                  <v-card-title>
                    <v-img :src="logo" height="4rem" contain></v-img>
                    <div
                      class="mt-8 text-h6 text-center"
                      v-text="$t('login')"
                      style="width: 100%;"
                    ></div>
                  </v-card-title>
                  <v-card-text>
                    <v-row no-gutters justify="center">
                      <v-col cols="12" md="8">
                        <div
                          class="text-body-2 mb-2"
                          v-text="$t('email')"
                        ></div>
                        <v-text-field
                          v-model="email"
                          :error-messages="emailErrors"
                          :placeholder="$t('email')"
                          outlined
                          dense
                          autocomplete="off"
                          autocorrect="off"
                          spellcheck="off"
                          @keyup.enter="signin"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters justify="center">
                      <v-col cols="12" md="8">
                        <div
                          class="text-body-2 mb-2"
                          v-text="$t('password')"
                        ></div>
                        <v-text-field
                          :type="showPassword ? 'text' : 'password'"
                          v-model="password"
                          :error-messages="passwordErrors"
                          :placeholder="$t('password')"
                          outlined
                          dense
                          @keyup.enter="signin"
                          @click:append="showPassword = !showPassword"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          autocorrect="off"
                          autocapitalize="off"
                          spellcheck="false"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions
                    class="d-flex flex-column justify-center mb-4"
                  >
                    <v-btn
                      color="primary"
                      class="mx-2 mb-4"
                      @click="signin"
                      :loading="loading"
                      small
                    >
                      {{ $t("login") }}
                    </v-btn>
                    <div class="text-caption text-center">
                      <router-link :to="{ name: 'signup' }">
                        {{ $t("signupIfNoAccount") }}
                      </router-link>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: null,
      password: null,
      showPassword: false,
      loading: false,
      background: require("@/assets/bg-login.jpg"),
      logo: require("@/assets/logo.png")
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    signin() {
      if (this.loading) return;

      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      this.$store
        .dispatch("auth/signin", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {})
        .finally(() => (this.loading = false));
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t("required"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t("required"));
      return errors;
    },
    isLogged() {
      return this.$store.getters["auth/isSignedIn"];
    }
  }
};
</script>
<style></style>
