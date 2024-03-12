<script setup>
import { ref } from 'vue'
import { LOCALE_KEY } from '@/constants'
import Button from './Button.vue'

const dialog = ref(false)
const message = ref(null)
const title = ref(null)
const emit = defineEmits(['onAgree'])

/**
 * Thực hiện open dialog và cho hiển thị title và message tương ứng
 */
function onOpen(tle, msg) {
  dialog.value = true
  title.value = tle
  message.value = msg
}

/**
 * Xử lý sự kiện khi bấm vào button OK và close dialog confirm
 */
function onAgree() {
  dialog.value = false
  emit('onAgree')
}

/**
 * Thực hiện close dialog khi bấm vào button cancel
 */
function cancel() {
  dialog.value = false
}

defineExpose({
  onOpen
})
</script>

<template>
  <v-dialog v-model="dialog" :max-width="400" :style="{ zIndex: 9999 }" @keydown.esc="cancel()">
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
