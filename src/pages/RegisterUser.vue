<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { AxiosError } from 'axios';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  username: '',
  email: '',
  password: '',
});

const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  try {

    await authStore.register(form.value.username, form.value.email, form.value.password);
    successMessage.value = 'Usuário registrado com sucesso!';

    await router.push('/login');

  } catch (err) {

    const axiosError = err as AxiosError<{ message: string}>;
    errorMessage.value = axiosError.response?.data?.message || 'Erro ao se registrar.'
  }
};
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
      v-model="form.email"
      label="E-mail"
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
      @click="handleSubmit"
      label="Registrar"
      color="primary"
    />
    <q-banner v-if="successMessage" class="q-mt-md" color="positive">
      {{ successMessage }}
    </q-banner>
    <q-banner v-if="errorMessage" class="q-mt-md" color="negative">
      {{ errorMessage }}
    </q-banner>
  </q-form>
</template>

<style scoped>
q-form {
  max-width: 400px;
  margin: 0 auto;
}

q-input {
  width: 100%;
}

q-btn {
  width: 100%;
}
</style>