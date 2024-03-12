<script setup>
const props = defineProps({
  value: String,
  numberChip: Number,
  lengthItemChip: Number
})
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
