<script lang="ts" setup>
type Props = {
  color: "primary" | "secondary" | "danger" | "medium";
  type: "text" | "solid";
  expand?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  type: "solid",
  color: "primary",
});

const colorClass = computed<string>(() => {
  if (props.type === "solid") {
    switch (props.color) {
      case "primary":
        return "bg-blue-400 hover:bg-blue-500 text-white active:bg-blue-600";
      case "secondary":
        return "bg-gray-400 hover:bg-gray-500 text-white";
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white active:bg-red-700";
    }
  } else {
    switch (props.color) {
      case "primary":
        return "text-blue-400 hover:bg-blue-50 active:bg-blue-100";
      case "secondary":
        return "text-gray-400 hover:bg-gray-50 active:bg-gray-100";
      case "danger":
        return "text-red-500 hover:bg-red-50 active:bg-red-100";
      case "medium":
        return "text-gray-700 hover:bg-gray-50 active:bg-gray-100";
    }
  }

  return "";
});

const expandClass = computed<string>(() => {
  if (props.expand) {
    return "w-full";
  }
  return "w-max";
});
</script>

<template>
  <button
    :class="[colorClass, expandClass]"
    class="p-2.5 rounded-lg text-sm select-none flex justify-center items-center transition-all"
  >
    <slot />
  </button>
</template>
