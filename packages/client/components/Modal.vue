<script lang="ts" setup>
type Props = {
  isOpen: boolean;
  title?: string;
  customClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: "",
  customClass: "",
});

const emits = defineEmits(["dismiss"]);

const wrapperClickHanlder = (ev: any) => {
  if (ev.target.id === "modal-wrapper") {
    emits("dismiss");
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        id="modal-wrapper"
        v-if="isOpen"
        class="absolute z-[5000] flex h-screen w-screen cursor-pointer items-center justify-center bg-black/70"
        @click="wrapperClickHanlder($event)"
      >
        <div
          class="flex h-max cursor-default w-max min-w-[20rem] flex-col rounded-lg bg-white"
          :class="customClass"
        >
          <div
            class="flex w-full justify-between items-center px-6 py-4 border-b border-gray-200"
          >
            <p class="font-bold text-xl">{{ title }}</p>
            <Icon
              name="ic:outline-close"
              class="w-6 h-6 cursor-pointer"
              @click="emits('dismiss')"
            />
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.125s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
