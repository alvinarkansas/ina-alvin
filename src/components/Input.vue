<template>
  <label :for="name" class="font-medium text-left">{{ label }}</label>
  <textarea
    v-if="type === 'textarea'"
    class="
      bg-white
      py-2
      px-4
      outline-none
      border border-linen
      focus:border-linen-darker
      h-36
    "
    type="text"
    @input="$emit('update:modelValue', $event.target.value)"
    spellcheck="false"
    :id="name"
    :value="modelValue"
  />
  <input
    v-else
    class="
      bg-white
      py-2
      px-4
      outline-none
      border border-linen
      focus:border-linen-darker
    "
    @input="$emit('update:modelValue', $event.target.value)"
    spellcheck="false"
    :id="name"
    :type="type"
    :value="modelValue"
  />
</template>

<script>
export default {
  name: "Input",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
  },
};
</script>
