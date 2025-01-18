<template>
    <div>
      <form @submit.prevent="signup">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Sign Up</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { supabase } from '../supabase';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async signup() {
        const { user, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });
  
        if (error) {
          this.error = error.message;
        } else {
          this.error = null;
          console.log('User signed up:', user);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>