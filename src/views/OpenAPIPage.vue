<template>
  <div class="openapi-page flex flex-col items-center gap-5 p-5">
    <AccountOpenAPI />
    <AuthOpenAPI />
    <SignupOpenAPI />
  </div>
</template>

<script setup lang="ts">
import AccountOpenAPI from '../components/AccountOpenAPI.vue';
import AuthOpenAPI from '../components/AuthOpenAPI.vue';
import SignupOpenAPI from '../components/SignupOpenAPI.vue';
</script>

<style scoped>

</style>