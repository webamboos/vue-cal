<script setup lang="ts">
import './scss/index.scss'
import VueCal from './vue-cal/index.vue'

const events = [
    {
      start: '2022-10-28 10:30:00',
      end: '2022-10-28 12:30:00',
      title: 'Dad\'s birthday!',
      content: '<i class="icon material-icons">cake</i>',
      class: 'sport'
    },
    {
      start: '2022-10-29 10:30:00',
      end: '2022-10-29 12:30:00',
      title: 'Dad\'s birthday 2!',
      content: '<i class="icon material-icons">cake</i>',
      class: 'sport'
    },
    {
      start: '2022-10-26 10:30:00',
      end: '2022-10-26 12:30:00',
      title: 'Dad\'s birthday 3!',
      content: '<i class="icon material-icons">cake</i>',
      class: 'sport'
    },
    {
      start: '2022-10-30 10:30:00',
      end: '2022-10-30 12:30:00',
      title: 'Dad\'s birthday 4!',
      content: '<i class="icon material-icons">cake</i>',
      class: 'sport'
    }
  ]

const now = new Date()

</script>

<template>
  <div>
    <VueCal :week-view-interval="now" :active-view="'xdays'" :events="events" />
  </div>
</template>
