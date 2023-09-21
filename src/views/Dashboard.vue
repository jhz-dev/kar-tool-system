<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div v-if="user.loggedIn">
            <div class="card-header">
              Welcome, {{ user.data.displayName }}
            </div>
            <div class="card-body">
              <div
                class="alert alert-success"
                role="alert"
              >
                You are logged in!
                <div
                  v-for="message in messagesList"
                  :key="message.id"
                >
                  {{ message.id }} - {{ message.text }} - {{ message.date }} - {{ message.userId }}
                </div>
                <div class="my-4">
                  <button
                    class="btn btn-primary"
                    @click.prevent="addTool"
                  >
                    <!-- <button
                    class="btn btn-primary"
                    @click.prevent="signOut"
                  > -->
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="alert alert-danger"
            role="alert"
          >
            You are not logged in!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

import { auth } from "../config/firebaseConfig";
import { fireStoreService } from "@/services/fireStore.service";
import { useUserStore } from '@/stores/user'

export default {
  name: "DashboardComponent",

  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const messagesList = ref();

    auth.onAuthStateChanged((user) => {
      userStore.fetchUser(user);
      loadData();
    });

    const user = computed(() => {
      return userStore.userState;
    });

    /* onMounted(() => {
      loadData();
    }) */

    const signOut = async () => {
      await userStore.logOut();
      router.push("/login");
    };

    const addTool = () => {
      fireStoreService.addDocument(
        "messages",
        {
          text: `test ${Date.now()}`,
          date: Date.now(),
          userId: user.value.data.uid
        }
      )
    };

    const loadData = async() => {
      if (!user.value.loggedIn) {
        return;
      }

      try {
        const messages = await fireStoreService.getDocuments("messages");
        messagesList.value = messages;
      } catch (error) {
        console.error(error);
      }
    };

    return { user, messagesList, signOut, addTool, loadData };
  },
};
</script>
