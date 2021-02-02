<template>
  <div>
    <div class="d-flex flex-column align-center">
      <!-- title  -->
      <v-sheet
        width="100%"
        color="#FFFFFF"
        class="d-flex align-start pa-4"
        style="border-bottom: 1px solid lightgray; position: -webkit-sticky; position: sticky; top: 3rem; z-index: 2;"
      >
        <v-btn elevation="2" fab @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-sheet>

      <!-- toolbar -->
      <v-row
        style="width: 100%; position: -webkit-sticky; position: sticky; top: 10.6rem; z-index: 2; background-color: #F5F5F5;"
        justify="center"
      >
        <v-col cols="12">
          <v-card width="100%" color="white" class="px-4">
            <v-row>
              <v-col cols="12" md="6">
                <div>
                  <v-btn
                    v-for="(item, i) in actionItems"
                    :key="i"
                    @click="emitAction(item.action)"
                    :color="item.color"
                    class="white--text me-2"
                    depressed
                  >
                    <v-icon
                      color="white"
                      class="me-6"
                      v-text="item.icon"
                    ></v-icon>
                    <span
                      class="font-weight-light"
                      v-text="$t(item.name)"
                    ></span>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

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
              <v-container class="mx-1 pt-8 justify-center">
                <slot></slot>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <confirm-dialog
      :isOpen="deleteInfo.dialog"
      :title="$t('delete')"
      :msg="$t('sureToDoOperation')"
      @cancel="deleteInfo.dialog = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import confirmDialog from "./confirmDialog";

export default {
  name: "card",
  props: {
    title: String,
    newBtn: { type: Boolean, default: false },
    saveBtn: { type: Boolean, default: false },
    deleteBtn: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  components: {
    "confirm-dialog": confirmDialog
  },
  data() {
    return {
      actionItems: [
        {
          icon: "mdi-asterisk",
          action: "reset-form",
          name: "newBtn",
          color: "blue"
        },
        {
          icon: "mdi-content-save-outline",
          action: "save",
          name: "saveBtn",
          color: "green"
        },

        {
          icon: "mdi-delete-sweep",
          action: "delete-item",
          name: "deleteBtn",
          color: "red"
        }
      ],

      deleteInfo: {
        dialog: false
      }
    };
  },
  methods: {
    emitAction(action) {
      if (action == "delete-item") {
        this.deleteInfo.dialog = true;
      } else this.$emit(action);
    },
    confirmDelete() {
      this.$emit("delete-item");
      this.deleteInfo.dialog = false;
    }
  }
};
</script>

<style scoped></style>
