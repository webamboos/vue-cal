<template lang="pug">
//- weekdays-headings are on week view only.
.vuecal__flex.vuecal__weekdays-headings.syncro-scroll
  template(v-for="(heading, i) in headings" :key="i")
    .vuecal__flex.vuecal__heading(
      v-if="!heading.hide"
      :class="{ today: heading.today, clickable: cellHeadingsClickable }"
      :style="weekdayCellStyles[heading.date]"
      @click="['week', 'xdays'].includes(view.id) && selectCell(heading.date, $event)"
      @dblclick="['week', 'xdays'].includes(view.id) && vuecal.dblclickToNavigate && switchToNarrowerView()")
      transition(:name="`slide-fade--${transitionDirection}`" :appear="vuecal.transitions")
        .vuecal__flex(column :key="vuecal.transitions ? `${i}-${heading.dayOfMonth}` : false")
          .vuecal__flex.weekday-label(grow)
            slot(name="weekday-heading" :heading="cleanupHeading(heading)" :view="view")
              //- For small/xsmall option. 3 media queries also truncate weekdays.
              span.full {{ heading.full }}
              span.small {{ heading.small }}
              span.xsmall {{ heading.xsmall }}
              span(v-if="heading.dayOfMonth") &nbsp;{{ heading.dayOfMonth }}
          .vuecal__flex.vuecal__split-days-headers(
            v-if="vuecal.hasSplits && vuecal.stickySplitLabels"
            grow)
            .day-split-header(v-for="(split, i) in vuecal.daySplits" :key="i" :class="split.class || false")
              slot(name="split-label" :split="split" :view="view") {{ split.label }}
</template>

<script>
export default {
  inject: ['vuecal', 'utils', 'modules', 'view', 'domEvents'],
  props: {
    transitionDirection: { type: String, default: 'right' },
    weekDays: { type: Array, default: () => [] },
    switchToNarrowerView: { type: Function, default: () => {} },
    data: { type: Object, required: true },
  },

  methods: {
    selectCell (date, DOMEvent) {
      if (date.getTime() !== this.view.selectedDate.getTime()) {
        this.view.selectedDate = date
      }
      this.utils.cell.selectCell(false, date, DOMEvent)
    },
    cleanupHeading: heading => ({
      label: heading.full,
      date: heading.date,
      ...(heading.today ? { today: heading.today } : {})
    })
  },
  
  watch: {
    vuecal: {
      // To be able to detect an event attribute change, it has to be first initialized with a value.
      handler(events, oldEvents) {
        console.log('events', events)
        console.log('oldEvents', oldEvents)
      },
      deep: true
    },
    
  },

  computed: {
    headings () {
      let todayFound = false

      switch(this.view.id) {
        case 'month':
        case 'week': {
          return this.weekDays.map((cell, i) => {
            const date = this.utils.date.addDays(this.view.startDate, this.vuecal.startWeekOnSunday ? i - 1 : i)

            return {
              hide: cell.hide,
              full: cell.label,
              // If defined in i18n file, weekDaysShort overrides default truncation of
              // week days when does not fit on screen or with small/xsmall options.
              small: cell.short || cell.label.substring(0, 3),
              xsmall: cell.short || cell.label.substring(0, 1),

              // Only for week or xdays view.
              ...(['week', 'xdays'].includes(this.view.id) ? {
                dayOfMonth: date.getDate(),
                date,
                today: !todayFound && this.utils.date.isToday(date) && !todayFound++
              } : {})
            }
          })
        }
        case 'xdays': {
          return this.weekDays.map((cell, i) => {
            const date = this.utils.date.addDays(this.view.startDate, this.vuecal.startWeekOnSunday ? i - 1 : i)

            const dayName = new Intl.DateTimeFormat(this.vuecal.locale || 'en', { weekday: 'long' })
            const label = dayName.format(date)

            return {
              hide: cell.hide,
              full: label,
              // If defined in i18n file, weekDaysShort overrides default truncation of
              // week days when does not fit on screen or with small/xsmall options.
              small: label.substring(0, 3),
              xsmall: label.substring(0, 1),

              // Only for week or xdays view.
              ...(['week', 'xdays'].includes(this.view.id) ? {
                dayOfMonth: date.getDate(),
                date,
                today: !todayFound && this.utils.date.isToday(date) && !todayFound++
              } : {})
            }
          })
        }
        default: { return [] }
      }

    },
    cellWidth () {
      return 100 / (7 - this.weekDays.reduce((total, day) => total + day.hide, 0))
    },
    weekdayCellStyles () {
      if(!this.vuecal.headingsWidthArray) return []
      let width = 0

      let headingsWidthArray = []
      console.log(this.headings)
      this.headings.forEach(heading => {
        headingsWidthArray[heading.date] = this.vuecal.headingsWidthArray[heading.date]
      });
      console.log('headings',headingsWidthArray)
      // const [overlaps, streak] = this.utils.event.checkCellOverlappingEvents(this.events.filter(e => !e.background && !e.allDay), this.options)
      // const parsedOverlaps = Object.values(overlaps).sort((a, b) => a.position - b.position).reduce((obj, item) => {
      //   obj[item.id] ? obj[item.position].elements.push(...item.elements) : (obj[item.position] = { ...item });
      //   return obj;
      // }, {})
      // console.log(streak, parsedOverlaps)

      // const overlappedEventsNumberArray = Object.values(parsedOverlaps).map(item => item?.overlaps?.length || 0)

      // const overlappedEventsMaxNumber = overlappedEventsNumberArray?.length ? Math.max(...overlappedEventsNumberArray) : 0

      // if(overlappedEventsMaxNumber > 0) {
      //   width = (100 * overlappedEventsMaxNumber) 
      // }
      return  headingsWidthArray
      // return {
      //   // ...(this.vuecal.hideWeekdays.length ? { width: `500px` } :  { width: `500px` })
      //   ...(this.vuecal.hideWeekdays.length ? { width: `${this.vuecal.hideWeekdays.length}%` } : width ? { width: `${width}px` } :{ })
      // }
    },
    cellHeadingsClickable () {
      return this.view.id === 'week' && (this.vuecal.clickToNavigate || this.vuecal.dblclickToNavigate)
    }
  }
}
</script>

<style lang="scss">
$time-column-width: 3em;
$time-column-width-12: 4em; // twelve-hour clock shows am/pm.
$week-numbers-width: 3em;
$weekdays-headings-height: 2.8em;
$weekdays-headings-height-with-splits: 3.4em;

.vuecal {
  &__weekdays-headings {
    border-bottom: 1px solid #ddd;
    margin-bottom: -1px;

    .vuecal--week-numbers & {padding-left: $week-numbers-width;}
    .vuecal--view-with-time & {padding-left: $time-column-width;}

    .vuecal--view-with-time.vuecal--twelve-hour & {
      font-size: 0.9em;
      padding-left: $time-column-width-12;
    }

    .vuecal--overflow-x.vuecal--view-with-time & {padding-left: 0;}
  }

  &__heading {
    width: 100%;
    height: $weekdays-headings-height;
    font-weight: 400;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    > .vuecal__flex {width: 100%;height: 100%;align-items: initial !important;} // For Vue transition.

    .vuecal--sticky-split-labels & {height: $weekdays-headings-height-with-splits;}

    .vuecal--month-view &, .vuecal--week-view &, .vuecal--day-view & {width: 14.2857%;}
    .vuecal--hide-weekends.vuecal--month-view &,
    .vuecal--hide-weekends.vuecal--week-view &,
    .vuecal--hide-weekends.vuecal--day-view & {width: 20%;}
    .vuecal--years-view & {width: 20%;}
    .vuecal--year-view & {width: 33.33%;}

    .weekday-label {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .vuecal--small & .small, .vuecal--xsmall & .xsmall {display: block;}
    .small, .xsmall,
    .vuecal--small & .full, .vuecal--small & .xsmall,
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}
  }

  .vuecal__split-days-headers {align-items: center;}
}

// Media queries.
//==================================//
@media screen and (max-width: 550px) {
  .vuecal__heading {
    line-height: 1.2;

    .small,
    .vuecal--small & .small,
    .vuecal--xsmall & .xsmall {display: block;}
    .full, .xsmall,
    .vuecal--small & .full, .vuecal--small & .xsmall,
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}

    .vuecal--overflow-x & .full,
    .vuecal--small.vuecal--overflow-x & .small,
    .vuecal--xsmall.vuecal--overflow-x & .xsmall {display: block;}
    .vuecal--overflow-x & .small, .vuecal--overflow-x & .xsmall,
    .vuecal--small.vuecal--overflow-x & .full, .vuecal--small.vuecal--overflow-x & .xsmall,
    .vuecal--xsmall.vuecal--overflow-x & .full, .vuecal--xsmall.vuecal--overflow-x & .small {display: none;}
  }
}

@media screen and (max-width: 450px) {
  .vuecal__heading {
    .xsmall,
    .vuecal--small & .xsmall,
    .vuecal--xsmall & .xsmall {display: block;}
    .full, .small,
    .vuecal--small & .full, .vuecal--small & .small,
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}

    .vuecal--small.vuecal--overflow-x & .small,
    .vuecal--xsmall.vuecal--overflow-x & .xsmall {display: block;}
    .vuecal--small.vuecal--overflow-x & .full, .vuecal--small.vuecal--overflow-x & .xsmall,
    .vuecal--xsmall.vuecal--overflow-x & .full, .vuecal--xsmall.vuecal--overflow-x & .small {display: none;}
  }
}
</style>
