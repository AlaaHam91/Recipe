<template>
  <div class="d-flex flex-column align-center">
    <!-- title  -->
    <v-sheet
      width="100%"
      color="#FFFFFF"
      class="d-flex align-start pa-4"
      style="border-bottom: 1px solid lightgray; position: -webkit-sticky; position: sticky; top: 3rem; z-index: 2;"
    >
      <div class="d-flex flex-column">
        <div class="text-h5 ml-4" v-text="title"></div>
      </div>
      <v-spacer></v-spacer>

      <v-btn elevation="2" class="mr-4 mt-3" @click="$emit('create')">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>

      <v-btn elevation="2" fab @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-sheet>

    <!-- content -->
    <v-row style="width: 100%;">
      <v-col cols="12">
        <v-card width="100%" color="white">
          <v-progress-linear
            indeterminate
            color="#263238"
            v-if="loading"
          ></v-progress-linear>

          <v-card-text>
            <v-container class="mx-1 pt-6 justify-center">
              <slot></slot>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "listCard",
  props: {
    title: String,
    loading: { type: Boolean, default: false }
  }
};
</script>

<style scoped></style>
