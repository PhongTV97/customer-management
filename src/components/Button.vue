<script setup lang="ts">
type Props = {
  classProp?: string
  color?: string
  variant?: string | any
  size?: string
}

type Emits = {
  (e: 'onClick'): void
}

const emit = defineEmits<Emits>()

withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  classProp: 'font-weight-bold text-body-2',
  color: 'primary'
})

/**
 * Handle click to button event
 */
const onHandleClick = () => {
  emit('onClick')
}
</script>

<template>
  <v-btn @click="onHandleClick" :class="classProp" :color="color" :variant="variant" :size="size">
    <slot />
  </v-btn>
</template>
