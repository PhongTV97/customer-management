<script setup>
const emit = defineEmits(['onClick'])

const props = defineProps({
  classProp: String,
  color: String,
  variant: String,
  size: String
})

const {
  variant = 'elevated',
  classProp = 'font-weight-bold text-body-2',
  color = 'primary'
} = props

/**
 * Xử lý sự kiện khi bấm vào button
 */
function onHandleClick() {
  emit('onClick')
}
</script>

<template>
  <v-btn @click="onHandleClick()" :class="classProp" :color="color" :variant="variant" :size="size">
    <slot />
  </v-btn>
</template>
