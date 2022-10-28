export type Views = 'years'|'year'|'month'|'week'|'day'

export interface VueCalProps {
  activeView: Views
  allDayBarHeight: string | number
  cellClickHold: boolean
  cellContextmenu: boolean
  clickToNavigate: boolean
  dblclickToNavigate: boolean
  disableDatePrototypes: boolean
  disableDays: any[]
  disableViews: Views[]
  dragToCreateEvent: boolean
  dragToCreateThreshold: number
  editableEvents: boolean | object
  events: any[]
  eventsCountOnYearView: boolean
  eventsOnMonthView: boolean | string
  hideBody: boolean
  hideTitleBar: boolean
  hideViewSelector: boolean
  hideWeekdays: any[]
  hideWeekends: boolean
  locale: string | object
  maxDate: string | Date
  minCellWidth: number
  minDate: string | Date
  minEventWidth: number
  minSplitWidth: number
  onEventClick: [Function, null]
  onEventCreate: [Function, null]
  onEventDblclick: [Function, null]
  overlapsPerTimeStep: boolean
  resizeX: boolean
  selectedDate: string | Date
  showAllDayEvents: [boolean, string]
  showTimeInCells: boolean
  showWeekNumbers: [boolean, string]
  snapToTime: number
  small: boolean
  specialHours: object
  splitDays: any[]
  startWeekOnSunday: boolean
  stickySplitLabels: boolean
  time: boolean
  timeCellHeight: number
  timeFormat: string
  timeFrom: number
  timeStep: number
  timeTo: number
  todayButton: boolean
  transitions: boolean
  twelveHour: boolean
  watchRealTime: boolean
  xsmall: boolean
}
