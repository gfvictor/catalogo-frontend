<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { AxiosError } from 'axios';

const router = useRouter();
const authStore = useAuthStore();
const errorMessage = ref<string | null>(null);

const form = ref({
  username: '',
  password: '',
})

const handleSubmit = async () => {
  try {

    await authStore.login(form.value.username, form.value.password);

    await router.push('/objects');
  } catch (err: unknown) {

    const axiosError = err as AxiosError<{ message: string }>;
    errorMessage.value = axiosError.response?.data?.message || 'Erro ao fazer o login.';
  }
};

const redirectToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <q-form class="q-pa-md" @submit.prevent="handleSubmit">
    <q-input
      class="q-mb-md"
      v-model="form.username"
      label="Usuário"
      filled
      required
      />
    <q-input
      class="q-mb-md"
      v-model="form.password"
      label="Senha"
      filled
      required
      />
    <q-btn
      class="q-mb-md"
      color="primary"
      @click="handleSubmit"
      label="Login"
      />
    <q-btn
      class="q-mb-md"
      color="primary"
      @click="redirectToRegister"
      label="Registrar"
      />
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </q-form>
</template>
