<script setup lang="ts">
/**
 * @author : PhongTV
 * @since : 3/6/2024, Wed
 */

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
const refTextField = ref(null)
const { t } = useI18n()
const valueModel = defineModel('value')

/**
 * Check required value and return error message
 */
const requiredFunc = (value: string | null): boolean | string => {
  const isValid = !props.required || value

  return isValid ? true : t(LOCALE_KEY.USER_NAME_TOO_LONG_ERROR_MSG)
}

/**
 * Validates the length of a value and return error message
 */
const counterLength = (value: string | null): boolean | string => {
  const isValid = !props.counter || !value || value.length <= CONSTANT.CUSTOMER_NAME_LENGTH

  return isValid ? true : t(LOCALE_KEY.USER_NAME_TOO_LONG_ERROR_MSG)
}

/**
 * Handle clear value of textfield
 */
const onClearTextField = () => {
  valueModel.value = ''
}
</script>

<template>
  <v-text-field
    ref="refTextField"
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
