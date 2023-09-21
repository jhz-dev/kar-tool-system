import { defineStore } from "pinia"
import { ref } from "vue"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, type User } from 'firebase/auth'

import { auth } from '../config/firebaseConfig'


export const useUserStore = defineStore('user', () => {
  const userState = ref<{loggedIn: boolean, data: any}>({
    loggedIn: false,
    data: {}
  });
  
  const register = async (
    { email, password, name }: { email: string, password: string, name: string }
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name });
      userState.value.data = user;
    } catch (error) {
      throw new Error('Unable to register user')
    }
  };

  const logIn = async (
    { email, password }: { email: string, password: string }
  ) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (response) {
      userState.value.data = response.user;
    } else {
      throw new Error('login failed')
    }
  };

  const logOut = async () => {
    await signOut(auth);
    userState.value.data = {};
  };

  const fetchUser = async(user: User | null) => {
    userState.value.loggedIn = user !== null;
    if (user) {
      userState.value.data = user;
    } else {
      userState.value.data = {};
    }
  }

  return { userState, register, logIn, logOut, fetchUser }
})