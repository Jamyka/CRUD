<template>
  <div class="col-lg-5 col-xs-12 flex column flex-center">
    <slot></slot>
    <q-form
      @submit="onSubmit()"
      @reset="onReset"
      class="q-gutter-md"
      ref="myForm"
      style="width: 90%"
    >
      <q-input
        v-model="name"
        filled
        label="Your name *"
        hint="Name and Surname"
        lazy-rules
        :rules="[
          // (val) => (val && val.length > 0) || 'Please type something',
          (val) =>
            (val.trim() && /^[a-zA-Z ]{4,16}$/.test(val)) ||
            'Please Enter Only Chars',
        ]"
      />

      <q-input
        filled
        v-model="email"
        type="email"
        label="Your Email *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your email',
          (val) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
            'Please type a valid Email',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "../stores/DataStore";
import { mapWritableState } from "pinia";

export default {
  data() {
    return {
      name: "",
      email: "",
    };
  },
  computed: {
    ...mapWritableState(useStore, ["alert", "message", "newUser"]),
  },
  methods: {
    onReset() {
      this.name = null;
      this.email = null;
      console.log(this.name);
    },
    onSubmit() {
      this.$refs.myForm.validate().then((res) => {
        if (res) {
          const data = {
            name: this.name,
            email: this.email,
          };
          axios
            .post("https://jsonplaceholder.typicode.com/users", data)
            .then((response) => {
              console.log(response);
              this.alert = true;
              this.message = "User was added Successfully";
              this.newUser = { id: response.data.id, ...data };
              this.name = null;
              this.email = null;
              this.$refs.myForm.resetValidation();
            })
            .catch(function (error) {
              console.log(error);
              this.alert = true;
              this.message =
                "User wasn't added Successfully, Please try again in a few moments";
            });
        }
      });
    },
  },
};
</script>
