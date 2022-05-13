import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("dataStore", {
  state: () => {
    return {
      newUser: {},
      usersList: [],
      err: "",
      edit: false,
      editItem: null,
      loading: false,
      alert: false,
      message: "",
    };
  },

  // getters: {
  //   doubleCount(state) {
  //     return state.counter * 2;
  //   },
  // },

  actions: {
    fetchUsers() {
      this.usersList = [];
      this.loading = true;
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          response.data.map((user) => {
            this.usersList.push(user);
          });
          this.loading = false;
        })
        .catch((err) => {
          this.err = err.message + " Please try again in a few moments";
          this.display(this.err);
        });
    },
    updateUser(item) {
      this.edit = true;
      this.editItem = item;
    },
    updateUserOnline(item) {
      this.loading = true;
      axios
        .put(
          `https://jsonplaceholder.typicode.com/posts/${item.id}`,
          this.editItem
        )
        .then((res) => {
          this.display("Updated Successfully");
          this.loading = false;
        });
    },
    removeUser(id) {
      this.loading = true;
      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => {
          console.log(response);
          this.usersList = this.usersList.filter((item) => {
            return id !== item.id;
          });
          this.display("Deleted Successfully");
          this.loading = false;
        });
    },
    display(err) {
      this.alert = true;
      this.message = err;
    },
    onDisplay(v) {
      this.alert = v.display;
      this.message = v.message;
      this.newUser = v.data ? v.data : null;
    },
  },
});
