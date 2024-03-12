<script setup lang="ts">
type Props = {
  classProp?: string
  color?: string
  variant?: string
  size?: string
}

type Emits = {
  (e: 'onClick'): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  classProp: 'font-weight-bold text-body-2',
  color: 'primary'
})

const { variant, color, classProp, size } = props

/**
 * Handle click action to button
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
