<template>
  <card
    @save="save"
    @delete-item="doDelete"
    @reset-form="resetForm"
    :title="$t('recipe')"
  >
    <div>
      <v-row v-for="(item, i) in messages" :key="i" no-gutters>
        <v-col cols="12" md="4">
          <v-alert
            icon="mdi-information"
            color="red"
            type="error"
            v-text="item"
          ></v-alert>
        </v-col>
      </v-row>
      <v-row class="mx-4">
        <v-col cols="12" md="4">
          <image-select
            v-model="form.image"
            class="mb-4"
            size="10rem"
            :error-messages="imageErrors"
          ></image-select>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="6">
              <div
                class="text-body-1 black--text mb-2"
                v-text="$t('name')"
              ></div>
              <v-text-field
                :placeholder="$t('name')"
                v-model="form.name"
                outlined
                autocomplete="off"
                :error-messages="nameErrors"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div
                class="text-body-1 black--text mb-2"
                v-text="$t('description')"
              ></div>
              <v-text-field
                :placeholder="$t('description')"
                v-model="form.description"
                outlined
                autocomplete="off"
                :error-messages="descriptionErrors"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </card>
</template>

<script>
import card from "@/components/card";
import { required } from "vuelidate/lib/validators";
import imageSelect from "@/components/image-selector";
import { mapFields } from "vuex-map-fields";
import promise from "promise";
import module from "../store/recipes.store";

export default {
  name: "recipe",
  components: {
    card,
    imageSelect
  },
  data() {
    return {
      items: [],
      loading: false
    };
  },
  validations: {
    form: {
      name: {
        required
      },
      description: { required },
      image: { required }
    }
  },
  computed: {
    ...mapFields("recipe", ["form"]),
    ...mapFields("recipe", ["id"]),
    ...mapFields("recipe", ["messages"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required && errors.push(this.$t("required"));
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.form.description.$dirty) return errors;
      !this.$v.form.description.required && errors.push(this.$t("required"));
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.form.image.$dirty) return errors;
      !this.$v.form.image.required && errors.push(this.$t("required"));
      return errors;
    }
  },
  methods: {
    doSave() {
      return new promise(async (resolve, reject) => {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$notify({
            text: this.$t("checkInputs"),
            type: "warning"
          });
          reject();
        } else
          this.$store
            .dispatch("recipe/save")
            .then(() => resolve())
            .catch(() => reject());
      });
    },
    save() {
      this.doSave()
        .then(() => this.$router.push({ name: "recips" }))
        .catch(() => {});
    },
    doDelete() {
      this.$store
        .dispatch("recipe/delete")
        .then(() => this.$router.push({ name: "recips" }))
        .catch(() => {});
    },
    resetForm() {
      this.$store.commit(`recipe/RESET`);
      this.$v.$reset();
    },
    load() {
      this.$store
        .dispatch("recipe/getRecipe")
        .then(() => {})
        .catch(() => {});
    }
  },
  created() {
    this.$store.registerModule("recipe", module);
    this.id = parseInt(this.$route.params.id);
    if (this.id > 0) this.load();
    else this.resetForm();
  },
  beforeDestroy() {
    this.$store.unregisterModule("recipe");
  }
};
</script>

<style></style>
