<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div
          class="row justify-between items-center full-width q-my-lg q-px-md"
        >
          <main-form>
            <img
              alt="Quasar logo"
              src="~assets/quasar-logo-vertical.svg"
              style="width: 200px; height: 200px"
              class="q-my-lg"
            />
          </main-form>
          <main-table :newUser="newUserData"></main-table>
        </div>
        <q-dialog v-model="alert">
          <q-card style="width: 500px">
            <q-card-section>
              <div class="text-h6">Alert</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              {{ message }}
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainTable from "src/components/MainTable.vue";
import MainForm from "src/components/MainForm.vue";
import { useStore } from "../stores/DataStore";
import { mapWritableState, mapActions } from "pinia";

export default {
  components: { MainTable, MainForm },
  computed: {
    ...mapWritableState(useStore, {
      alert: "alert",
      message: "message",
      newUserData: "newUser",
    }),
  },
  methods: {
    ...mapActions(useStore, ["onDisplay"]),
  },
};
</script>
<style>
body {
  overflow: hidden;
}
</style>
