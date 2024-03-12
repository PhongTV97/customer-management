<script setup lang="ts">
import { CONSTANT, LOCALE_KEY } from '@/constants'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

type Props = {
  label: string
  counter?: number
  hint?: string
  required?: boolean
}

const props = defineProps<Props>()
const textFieldRef = ref<any>(null)
const { t } = useI18n()
const valueModel = defineModel('value')

/**
 * Checks if a value is provided when required and returns an error message if not.
 */
function requiredFunc(value: string | null): boolean | string {
  const valid = !props.required || value

  return valid ? true : t(LOCALE_KEY.USER_NAME_TOO_LONG_ERROR_MSG)
}

/**
 * Validates the length of a value against a constant maximum length.
 * @param {string} value
 * @returns {boolean|string} Returns true if the length of the value is valid,otherwise returns a error message
 */
function counterLength(value: string | null): boolean | string {
  const isValid = !props.counter || !value || value.length <= CONSTANT.CUSTOMER_NAME_LENGTH

  return isValid ? true : t(LOCALE_KEY.USER_NAME_TOO_LONG_ERROR_MSG)
}

/**
 * Handle clear value of textfield
 */
function onClearTextField() {
  valueModel.value = ''
}
</script>

<template>
  <v-text-field
    ref="textFieldRef"
    v-model="valueModel"
    density="compact"
    variant="outlined"
    clearable
    persistent-hint
    :counter="counter"
    :rules="[counterLength, requiredFunc]"
    :label="label"
    :hint="hint"
    @click:clear="onClearTextField"
  ></v-text-field>
</template>

<style>
.v-input--is-focused .v-input__slot {
  border: 2px solid #005fcc !important;
  border-bottom-color: rgba(0, 0, 0, 0.38) !important;
}
</style>
