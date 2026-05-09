<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "@/composables/useTheme";
const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
  }>(),
  {
    placeholder: "Type your text",
  },
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const { getCurrentTheme } = useTheme();
const isDark = computed(() => getCurrentTheme() === "dark");

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  emit("update:modelValue", target?.value ?? "");
};

const onReset = () => {
  emit("update:modelValue", "");
};
</script>

<template>
  <div class="search" :class="{ 'search--dark': isDark }">
    <input
      type="text"
      class="search__input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onInput"
    />
    <button class="search__button" type="button" aria-label="Search">
      <v-icon class="search__icon" icon="mdi-magnify" size="20" />
    </button>
  </div>
</template>

<style scoped>
/* From Uiverse.io by joe-watson-sbf */
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: 100%;
}

.search__input {
  font-family: inherit;
  font-size: inherit;
  background-color: rgba(var(--v-theme-surface), 0.9);
  border: 1px solid rgba(var(--v-border-color), 0.2);
  color: rgba(var(--v-theme-on-surface), 0.8);
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 100%;
  transition: all ease-in-out 0.5s;
  margin-right: -3rem;
}

.search__input:hover,
.search__input:focus {
  box-shadow: 0 0 1em rgba(var(--v-theme-primary), 0.12);
}

.search__input:focus {
  outline: none;
  background-color: rgba(var(--v-theme-surface), 1);
  border-color: rgba(var(--v-theme-primary), 0.6);
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: rgba(var(--v-theme-on-surface), 0.4);
}

.search__input:focus + .search__button {
  background-color: transparent;
}

.search__button {
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 0;
  appearance: none;
  margin-top: 0.1em;
}

.search__button:hover {
  cursor: pointer;
}

.search__icon {
  margin-right: 0.8em;
  color: rgba(var(--v-theme-on-surface), 0.45);
  margin-left: -0.6rem;
}
</style>
