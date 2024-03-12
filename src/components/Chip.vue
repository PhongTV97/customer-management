<script setup lang="ts">
type Props = {
  value: string
  numberChip: number
  lengthItemChip: number
}

defineProps<Props>()
</script>

<template>
  <v-chip
    v-for="item in value.split(',').slice(0, numberChip)"
    class="ml-1 white--text"
    color="light-blue-darken-4"
    prepend-icon="mdi-tag-outline"
  >
    <span>{{
      item && item.length > lengthItemChip ? item.substring(0, lengthItemChip) + '...' : item
    }}</span>
  </v-chip>
</template>
