<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.store";

const isOpen = ref(false);
const registerOpen = ref(false);

const dismiss = (ev: any) => {
  if (ev === "register") {
    registerOpen.value = true;
    return;
  }

  isOpen.value = false;
};

const { logout } = useAuthStore();
</script>

<template>
  <NuxtLoadingIndicator />
  <section
    class="relative flex justify-center w-full h-screen p-20 mx-auto container gap-6"
  >
    <SideMenu />
    <div class="flex flex-col gap-6 w-full">
      <InputText icon="ic:outline-search" />
      <div
        class="flex flex-col w-full border border-gray-200 shadow-md p-6 rounded-2xl h-4/5"
      >
        <slot />
      </div>
      <BottomMenu @login="isOpen = true" @logout="logout()" />
    </div>
    <LoginModal :is-open="isOpen" @dismiss="dismiss($event)" />
    <RegisterModal :is-open="registerOpen" @dismiss="registerOpen = false" />
  </section>
</template>
