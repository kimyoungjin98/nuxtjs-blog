<script lang="ts" setup>
type Props = {
  modelValue?: string | boolean;
  label?: string;
  value?: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: "",
  value: "",
});

const emits = defineEmits(["update:modelValue"]);

const checked = ref<boolean>(false);

const toggle = () => {
  checked.value = !checked.value;

  if (!checked.value) {
    emits("update:modelValue", null);
    return;
  }

  emits("update:modelValue", props.value);
};
</script>

<template>
  <div
    class="flex gap-2 items-center p-2.5 hover:bg-blue-50 active:bg-blue-100 transition-all rounded-lg cursor-pointer"
    @click="toggle()"
  >
    <div
      class="w-5 h-5 rounded border-2 border-gray-200 flex items-center justify-center transition-all"
      :class="checked ? 'bg-blue-500' : 'bg-white'"
    >
      <Icon
        name="ic:baseline-check"
        class="w-4 h-4 transition-all"
        :class="checked ? 'text-white' : 'text-transparent'"
      />
    </div>
    <span class="text-sm text-gray-700">{{ label }}</span>
  </div>
</template>
