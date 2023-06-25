<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.store";

const emits = defineEmits(["login", "logout"]);
</script>

<template>
  <div
    class="w-full flex p-2 px-3 items-center gap-4 rounded-2xl border border-gray-200 shadow-md text-gray-700"
  >
    <div class="flex gap-2 items-center rounded p-2 w-full">
      <template v-if="useAuthStore().user">
        <Icon class="w-6 h-6 text-gray-700" name="ic:baseline-person" />
        <p class="text-sm">{{ useAuthStore().user?.name }}</p>
      </template>
      <template v-if="!useAuthStore().user">
        <Icon class="w-6 h-6 text-gray-700" name="ic:outline-person" />
        <p class="text-sm">로그인이 필요합니다.</p>
      </template>
    </div>
    <div class="flex gap-2 items-center rounded p-2 min-w-max">
      <Icon class="w-6 h-6 text-green-600" name="fa6-solid:server" />
      <p class="text-sm">서버</p>
    </div>
    <div class="h-6 w-px bg-gray-200"></div>
    <div
      v-if="useAuthStore().user"
      @click="emits('logout')"
      class="flex gap-2 items-center rounded p-2 hover:bg-gray-100 cursor-pointer min-w-max"
    >
      <Icon class="w-6 h-6" name="ic:baseline-logout" />
      <p class="text-sm">로그아웃</p>
    </div>
    <div
      v-if="!useAuthStore().user"
      @click="emits('login')"
      class="flex gap-2 items-center rounded p-2 hover:bg-gray-100 cursor-pointer min-w-max"
    >
      <Icon class="w-6 h-6" name="ic:outline-plus" />
      <p class="text-sm">로그인</p>
    </div>
  </div>
</template>
