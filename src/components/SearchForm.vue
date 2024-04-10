<script setup lang="ts">
/**
 * @author : PhongTV
 * @since : 3/6/2024, Wed
 */

import { LOCALE_KEY } from '@/constants'
import TextField from './TextField.vue'
import Button from './Button.vue'

type Emits = {
  (e: 'onSearch'): void
  (e: 'onClear'): void
}

const emit = defineEmits<Emits>()
const customerName = defineModel('customerName')
const tags = defineModel('tags')

/**
 * Handle search event
 */
const onSearch = () => {
  emit('onSearch')
}

/**
 * Handle clear condition
 */
const onClearSearchCondition = () => {
  emit('onClear')
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="5">
      <TextField
        v-model:value="customerName"
        :label="$t(LOCALE_KEY.USER_NAME_LABEL)"
        hide-details
      />
    </v-col>
    <v-col cols="12" sm="5">
      <TextField
        v-model:value="tags"
        :label="$t(LOCALE_KEY.TAGS)"
        :hint="$t(LOCALE_KEY.NOTICE_TAGS)"
      />
    </v-col>
    <v-col cols="12" sm="2" class="d-flex">
      <Button icon="mdi-magnify" size="small" classProp="text-white" @on-click="onSearch">
        <v-icon>mdi-magnify</v-icon>
      </Button>
      <Button
        icon="mdi-close"
        size="small"
        classProp="grey-bg ml-1"
        @on-click="onClearSearchCondition"
      >
        <v-icon>mdi-close</v-icon>
      </Button>
    </v-col>
  </v-row>
</template>

<style scoped>
.grey-bg {
  background-color: #6b6060 !important;
}
</style>
