<script lang="ts" setup>
type Props = {
  name?: string;
  modelValue?: string;
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  icon?: string;
  type?: "text" | "password";
};

const props = withDefaults(defineProps<Props>(), {
  name: "",
  modelValue: "",
  placeholder: "",
  icon: "",
  readonly: false,
  autofocus: false,
  type: "text",
});

const emits = defineEmits(["update:modelValue"]);

const inputHandler = (ev: any) => {
  emits("update:modelValue", ev.target.value);
};
</script>

<template>
  <div
    class="text-sm flex w-full gap-2 px-3 items-center rounded-lg shadow-md border-2 border-gray-200 bg-white transition-all hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-400"
  >
    <Icon class="w-6 h-6 text-gray-700" :name="icon" v-if="icon" />
    <input
      class="w-full bg-transparent py-3 text-sm outline-none"
      :placeholder="placeholder"
      :readonly="readonly"
      :autofocus="autofocus"
      :value="modelValue"
      :type="type"
      @input="inputHandler($event)"
    />
  </div>
</template>
