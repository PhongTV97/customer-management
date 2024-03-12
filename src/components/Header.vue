<script setup>
import { LOCALE_KEY } from '@/constants'
</script>

<template>
  <v-card class="mx-auto">
    <div>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-title>{{ $t(LOCALE_KEY.APP_NAME) }}</v-app-bar-title>
      </v-app-bar>
    </div>
  </v-card>
</template>
