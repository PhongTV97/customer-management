<script setup lang="ts">
/**
 * @author : PhongTV
 * @since : 3/7/2024, Thu
 */

import { ref } from 'vue'
import { LOCALE_KEY } from '@/constants'
import Button from './Button.vue'

type Emits = {
  (e: 'onAgree'): void
}

const emit = defineEmits<Emits>()
const dialog = ref<boolean>(false)
const message = ref<string>('')
const title = ref<string>('')

/**
 * Open an dialog and display the corresponding title and message
 */
const onOpen = (tle: string, msg: string) => {
  dialog.value = true
  title.value = tle
  message.value = msg
}

/**
 * Handle the event when clicking the OK button and closing the confirm dialog
 */
const onAgree = () => {
  dialog.value = false
  emit('onAgree')
}

/**
 * Close the dialog box when pressing the cancel button
 */
const cancel = () => {
  dialog.value = false
}

defineExpose({
  onOpen
})
</script>

<template>
  <v-dialog v-model="dialog" :max-width="400" :style="{ zIndex: 9999 }" @keydown.esc="cancel">
    <v-card>
      <v-card-title dense flat class="title-grey-bg">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-2" v-html="message"></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <Button variant="outlined" @on-click="cancel">
          {{ $t(LOCALE_KEY.CANCEL_BTN) }}
        </Button>
        <Button @on-click="onAgree">
          {{ $t(LOCALE_KEY.OK_BTN) }}
        </Button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.title-grey-bg {
  background-color: #eee;
  color: black;
}
</style>
