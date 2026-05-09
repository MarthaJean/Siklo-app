<script setup lang="ts">
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

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  emit("update:modelValue", target?.value ?? "");
};

const onReset = () => {
  emit("update:modelValue", "");
};
</script>

<template>
  <div class="search">
    <input
      type="text"
      class="search__input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onInput"
    />
    <button class="search__button" type="button">
      <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path
            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
          ></path>
        </g>
      </svg>
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
  margin-right: -2rem;
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
  background-color: rgba(var(--v-theme-surface), 1);
}

.search__button {
  border: none;
  background-color: rgba(var(--v-theme-surface), 0.9);
  margin-top: 0.1em;
}

.search__button:hover {
  cursor: pointer;
}

.search__icon {
  height: 1.3em;
  width: 1em;
  margin-right: 0.8em;
  fill: rgba(var(--v-theme-on-surface), 0.45);
}
</style>
