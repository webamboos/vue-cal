<script setup lang="ts">
import './scss/index.scss'
import VueCal from './vue-cal/index.vue'

const events = [
  {
    start: '2022-11-17 05:30:00',
    end: '2022-11-17 06:30:00',
    title: 'Dad\'s birthday!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 06:00:00',
    end: '2022-11-17 16:30:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 06:00:00',
    end: '2022-11-17 07:00:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 06:00:00',
    end: '2022-11-17 07:00:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 06:00:00',
    end: '2022-11-17 07:00:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 06:15:00',
    end: '2022-11-17 07:15:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 07:00:00',
    end: '2022-11-17 08:00:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 07:15:00',
    end: '2022-11-17 08:15:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },

  {
    start: '2022-11-17 08:15:00',
    end: '2022-11-17 12:15:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },

  {
    start: '2022-11-17 12:15:00',
    end: '2022-11-17 14:15:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },

  {
    start: '2022-11-17 10:30:00',
    end: '2022-11-17 11:00:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 10:30:00',
    end: '2022-11-17 11:00:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 15:00:00',
    end: '2022-11-17 15:30:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 15:00:00',
    end: '2022-11-17 15:15:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },
  {
    start: '2022-11-17 05:00:00',
    end: '2022-11-17 05:30:00',
    title: 'Dad\'s birthday 2!',
    content: '<i class="icon material-icons">cake</i>',
    class: 'sport'
  },


]

const now = new Date()

</script>

<template>
  <div>
    <VueCal :x-days-start="now" :active-view="'xdays'" :events="events" />
  </div>
</template>
