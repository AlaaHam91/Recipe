<template>
  <div>
    <list-card
      @create="$router.push({ name: 'recipe', params: { id: 0 } })"
      :loading="loading"
      :title="$t('recipes')"
    >
      <v-row>
        <v-col cols="12" md="3" v-for="(item, i) in items" :key="i">
          <v-card width="100%" min-height="5rem">
            <v-img :src="item.image" height="200px"></v-img>
            <v-card-title
              class="d-flex justify-center align-center flex-column "
            >
              <div class="text-body-1 black--text" v-text="item.name"></div>
            </v-card-title>
            <v-card-text>
              <div class="text--primary" v-text="item.description"></div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                color="error"
                icon
                small
                @click="
                  deleteInfo.dialog = true;
                  selectedItem = item.id;
                "
              >
                <v-icon> mdi-close-circle</v-icon>
              </v-btn>
              <v-btn
                icon
                small
                :to="{ name: 'recipe', params: { id: item.id } }"
              >
                <v-icon> mdi-pencil</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </list-card>
    <confirm-dialog
      :isOpen="deleteInfo.dialog"
      :title="$t('delete')"
      :msg="$t('sureToDoOperation')"
      @cancel="deleteInfo.dialog = false"
      @confirm="doDelete"
    />
  </div>
</template>

<script>
import api from "@/services/api/recipe/recipe.api";
import listCard from "@/components/listCard";
import confirmDialog from "@/components/confirmDialog";

export default {
  name: "recipes",
  components: {
    listCard,
    confirmDialog
  },
  data() {
    return {
      items: [],
      loading: false,
      selectedItem: -1,
      deleteInfo: {
        dialog: false
      }
    };
  },

  methods: {
    async load(payload = null) {
      this.loading = true;
      this.items = await api.index(payload);
      this.loading = false;
    },
    doDelete() {
      console.log(this.selectedItem);
      this.selectedItem = -1;
      this.deleteInfo.dialog = false;
    }
  },
  created() {
    this.load();
  }
};
</script>

<style></style>
