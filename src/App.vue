<script setup lang="ts">
/**
 * @author : PhongTV
 * @since : 3/5/2024, Tue
 */

import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <v-app>
    <Header />
    <RouterView />
  </v-app>
</template>
