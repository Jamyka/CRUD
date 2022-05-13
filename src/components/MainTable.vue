<template>
  <div class="q-pa-md col-lg-6 col-xs-12">
    <q-table
      title="Users List"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      hide-pagination
      :loading="loading"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-weight-bolder text-primary text-center"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <!-- <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td> -->
          <!-- <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td> -->
          <q-td key="index" :props="props">
            {{ props.pageIndex + 1 }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="updateUser(props.row)"
              icon="edit"
              class="q-mx-sm"
            />
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="removeUser(props.row.id)"
              icon="delete"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="edit">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit User Data</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="editItem.name" label="name" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="editItem.email" label="email" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          v-close-popup
          @click="updateUserOnline(editItem)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import axios from "axios";
import { useStore } from "../stores/DataStore";
import { mapActions, mapWritableState } from "pinia";
export default {
  props: ["newUser"],
  watch: {
    newUser: {
      deep: true,
      flush: "post",
      handler(newValue, oldValue) {
        this.rows = [...this.rows, newValue];
      },
    },
  },
  computed: {
    ...mapWritableState(useStore, {
      rows: "usersList",
      alert: "alert",
      loading: "loading",
      edit: "edit",
      editItem: "editItem",
      err: "err",
    }),
  },
  data() {
    return {
      columns: [
        {
          name: "index",
          required: "true",
          label: "No.",
          align: "left",
          field: "id",
          sortable: true,
        },
        // {
        //   name: "id",
        //   required: "true",
        //   label: "ID",
        //   align: "left",
        //   field: "id",
        //   sortable: true,
        // },
        {
          name: "name",
          required: true,
          label: "Full Name",
          align: "center",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          sortable: true,
          align: "center",
        },
        {
          name: "actions",
          align: "center",
          label: "Actions",
          sortable: true,
        },
      ],
    };
  },
  beforeUpdate() {
    this.rows = this.rows.filter((item) => {
      return item !== null;
    });
  },
  methods: {
    ...mapActions(useStore, [
      "fetchUsers",
      "updateUser",
      "updateUserOnline",
      "removeUser",
      "display",
    ]),
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
