<script setup lang="ts">
import "./scss/index.scss";
import VueCal from "./vue-cal/index.vue";
const events  = [
// {
//   start: "2022-11-21 05:30:00",
//   end: "2022-11-21 06:30:00",
//   title: "1 Dad's birthday!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 06:00:00",
//   end: "2022-11-21 16:30:00",
//   title: "2 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },

// {
//   start: "2022-11-21 06:00:00",
//   end: "2022-11-21 07:00:00",
//   title: "3 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 06:15:00",
//   end: "2022-11-21 07:15:00",
//   title: "4 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 07:00:00",
//   end: "2022-11-21 08:00:00",
//   title: "5 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 07:15:00",
//   end: "2022-11-21 08:15:00",
//   title: "6 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },

// {
//   start: "2022-11-21 08:15:00",
//   end: "2022-11-21 12:15:00",
//   title: "7 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },

// {
//   start: "2022-11-21 12:15:00",
//   end: "2022-11-21 14:15:00",
//   title: "8 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },

// {
//   start: "2022-11-21 10:30:00",
//   end: "2022-11-21 11:00:00",
//   title: "9 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 10:30:00",
//   end: "2022-11-21 11:00:00",
//   title: "10 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 15:00:00",
//   end: "2022-11-21 15:30:00",
//   title: "11 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 15:00:00",
//   end: "2022-11-21 15:15:00",
//   title: "12 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
// {
//   start: "2022-11-21 05:00:00",
//   end: "2022-11-21 05:30:00",
//   title: "13 Dad's birthday 2!",
//   content: '<i class="icon material-icons">cake</i>',
//   class: "sport",
// },
//   {
//     start: "2022-11-22 05:30:00",
//     end: "2022-11-22 06:30:00",
//     title: "14 Dad's birthday!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 06:00:00",
//     end: "2022-11-22 16:30:00",
//     title: "15 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 06:00:00",
//     end: "2022-11-22 07:00:00",
//     title: "16 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 06:00:00",
//     end: "2022-11-22 07:00:00",
//     title: "17 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 06:00:00",
//     end: "2022-11-22 07:00:00",
//     title: "18 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 06:15:00",
//     end: "2022-11-22 07:15:00",
//     title: "19 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 07:00:00",
//     end: "2022-11-22 08:00:00",
//     title: "20 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 07:15:00",
//     end: "2022-11-22 08:15:00",
//     title: "21 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-22 08:15:00",
//     end: "2022-11-22 12:15:00",
//     title: "22 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 16:30:00",
//     end: "2022-11-22 17:30:00",
//     title: "23 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 16:30:00",
//     end: "2022-11-22 17:15:00",
//     title: "24 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-22 05:00:00",
//     end: "2022-11-22 05:30:00",
//     title: "25 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-23 05:00:00",
//     end: "2022-11-23 06:00:00",
//     title: "26 Dad's birthday!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 05:00:00",
//     end: "2022-11-23 06:00:00",
//     title: "27 Dad's birthday!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 05:00:00",
//     end: "2022-11-23 06:00:00",
//     title: "28 Dad's birthday!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 06:00:00",
//     end: "2022-11-23 16:30:00",
//     title: "29 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 06:00:00",
//     end: "2022-11-23 07:00:00",
//     title: "30 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 06:00:00",
//     end: "2022-11-23 07:00:00",
//     title: "31 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 06:00:00",
//     end: "2022-11-23 07:00:00",
//     title: "32 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 06:15:00",
//     end: "2022-11-23 07:15:00",
//     title: "33 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 07:00:00",
//     end: "2022-11-23 08:00:00",
//     title: "34 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 07:15:00",
//     end: "2022-11-23 08:15:00",
//     title: "35 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-23 08:15:00",
//     end: "2022-11-23 12:15:00",
//     title: "36 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-23 12:15:00",
//     end: "2022-11-23 14:15:00",
//     title: "37 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-23 10:30:00",
//     end: "2022-11-23 11:00:00",
//     title: "38 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 10:30:00",
//     end: "2022-11-23 11:00:00",
//     title: "Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 15:00:00",
//     end: "2022-11-23 15:30:00",
//     title: "39 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 15:00:00",
//     end: "2022-11-23 15:15:00",
//     title: "40 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-23 05:00:00",
//     end: "2022-11-23 05:30:00",
//     title: "41 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 05:30:00",
//     end: "2022-11-24 06:30:00",
//     title: "42 Dad's birthday!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 06:00:00",
//     end: "2022-11-24 16:30:00",
//     title: "43 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 06:00:00",
//     end: "2022-11-24 07:00:00",
//     title: "44 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-24 07:00:00",
//     end: "2022-11-24 08:00:00",
//     title: "45 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 07:15:00",
//     end: "2022-11-24 08:15:00",
//     title: "46 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-24 08:15:00",
//     end: "2022-11-24 12:15:00",
//     title: "47 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-24 12:15:00",
//     end: "2022-11-24 14:15:00",
//     title: "48 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },

//   {
//     start: "2022-11-24 10:30:00",
//     end: "2022-11-24 11:00:00",
//     title: "49 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 10:30:00",
//     end: "2022-11-24 11:00:00",
//     title: "50 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 15:00:00",
//     end: "2022-11-24 15:30:00",
//     title: "51 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 15:00:00",
//     end: "2022-11-24 15:15:00",
//     title: "52 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
//   {
//     start: "2022-11-24 05:00:00",
//     end: "2022-11-24 05:30:00",
//     title: "53 Dad's birthday 2!",
//     content: '<i class="icon material-icons">cake</i>',
//     class: "sport",
//   },
  {
    start: "2022-12-05 05:30:00",
    end: "2022-12-05 06:30:00",
    title: "54 Dad's birthday!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 06:00:00",
    end: "2022-12-05 16:30:00",
    title: "55 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 06:00:00",
    end: "2022-12-05 07:00:00",
    title: "56 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 06:00:00",
    end: "2022-12-05 07:00:00",
    title: "57 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 06:00:00",
    end: "2022-12-05 07:00:00",
    title: "58 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 06:15:00",
    end: "2022-12-05 07:15:00",
    title: "59 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 07:00:00",
    end: "2022-12-05 08:00:00",
    title: "60 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 07:15:00",
    end: "2022-12-05 08:15:00",
    title: "61 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },

  {
    start: "2022-12-05 08:15:00",
    end: "2022-12-05 12:15:00",
    title: "62 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },

  {
    start: "2022-12-05 12:15:00",
    end: "2022-12-05 14:15:00",
    title: "63 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },

  {
    start: "2022-12-05 10:30:00",
    end: "2022-12-05 11:00:00",
    title: "64 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-05 10:30:00",
    end: "2022-12-05 11:00:00",
    title: "65 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },

  {
    start: "2022-12-06 05:30:00",
    end: "2022-12-06 06:30:00",
    title: "54 Dad's birthday!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-06 06:00:00",
    end: "2022-12-06 16:30:00",
    title: "55 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-06 06:00:00",
    end: "2022-12-06 07:00:00",
    title: "56 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
  {
    start: "2022-12-06 06:00:00",
    end: "2022-12-06 07:00:00",
    title: "57 Dad's birthday 2!",
    content: '<i class="icon material-icons">cake</i>',
    class: "sport",
  },
];

const splits = [{
        id: "d1ffcc93-2ada-47ae-9e80-bad090c7248a",
        label: 'test',
        class: 'split-size',
        content: {
          nrOfEvents: 10,
        },
      },
      {
        id: "d1ffcc93-2ad86a-47ae-9e80-bad090c7248a",
        label: 'test3',
        class: 'split-size',
        content: {
          nrOfEvents: 10,
        },
      },
      {
        id: "d1ffcc93-2ada-47ae-9e80-bad090c7248a747",
        label: 'test4',
        class: 'split-size',
        content: {
          nrOfEvents: 10,
        },
      },
      {
        id: "d1ffcc93-2ada-47a7457e-9e80-bad090c7248a",
        label: 'test2',
        class: 'split-size',
        content: {
          nrOfEvents: 10,
        },
      }
    ]

const now = new Date();
</script>

<template>
  <div>
    <VueCal :x-days-interval="7" :x-days-start="now" :split-days="splits" :active-view="'day'" :events="events" :editable-events="{ title: true, drag: false, resize: true, delete: true, create: true }" >
      <template #split-label="{ split, view, sizes }">
        <div class="split-label">
          <div class="split-label__label">{{ split.label }}</div>
          <div class="split-label__size">style = {{sizes }}</div>
        </div>
        </template>
    </VueCal>
  </div>
</template>
