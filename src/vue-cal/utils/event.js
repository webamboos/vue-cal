/**
 * Events Utils.
 *
 * Waiting for VS Code to support JavaScript private fields.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields
 * Meantime keep `_` for private.
 */

const defaultEventDuration = 2 // In hours.
const minutesInADay = 24 * 60 // Don't do the maths every time.

let ud

// Event overlaps: only for the current view, recreated on view change.
let _cellOverlaps, _comparisonArray

// This is an approximation, it will not work with DLS time.
// const approxDayMilliseconds = minutesInADay * 60 * 1000
// This is an approximate minimum we can get in a year. Purposely stay below 365 but close.
// const minYearMilliseconds = 364 * approxDayMilliseconds // Don't do the maths every time.

export default class EventUtils {
  _vuecal = null

  eventDefaults = {
    _eid: null,
    start: '', // Externally given formatted date & time or Date object.
    startTimeMinutes: 0,
    end: '', // Externally given formatted date & time or Date object.
    endTimeMinutes: 0,
    title: '',
    content: '',
    background: false,
    allDay: false,
    segments: null,
    repeat: null,
    daysCount: 1,
    deletable: true,
    deleting: false,
    titleEditable: true,
    resizable: true,
    resizing: false,
    draggable: true,
    dragging: false,
    draggingStatic: false, // Controls the CSS class of the static clone while dragging.
    focused: false,
    class: ''
  }

  constructor(vuecal, dateUtils) {
    this._vuecal = vuecal
    ud = dateUtils
  }

  /**
   * Create an event at the given date and time, and allow overriding
   * event attributes through the eventOptions object.
   *
   * @param {Date | String} dateTime The date and time of the new event start.
   * @param {Number} duration the event duration in minutes.
   * @param {Object} eventOptions some options to override the `eventDefaults` - optional.
   */
  createAnEvent(dateTime, duration, eventOptions) {
    if (typeof dateTime === 'string') dateTime = ud.stringToDate(dateTime)
    if (!(dateTime instanceof Date)) return false

    const startTimeMinutes = ud.dateToMinutes(dateTime)
    duration = duration * 1 || defaultEventDuration * 60
    const endTimeMinutes = startTimeMinutes + duration
    const end = ud.addMinutes(new Date(dateTime), duration)

    // Automatically add the required endTimeMinutes when passing an end.
    if (eventOptions.end) {
      if (typeof eventOptions.end === 'string') eventOptions.end = ud.stringToDate(eventOptions.end)
      eventOptions.endTimeMinutes = ud.dateToMinutes(eventOptions.end)
    }

    const event = {
      ...this.eventDefaults,
      _eid: `${this._vuecal._.uid}_${this._vuecal.eventIdIncrement++}`,
      start: dateTime,
      startTimeMinutes,
      end,
      endTimeMinutes,
      segments: null,
      ...eventOptions
    }

    // If the onEventCreate() function is given as a parameter to vue-cal:
    // 1. give it access to the created event & the deleteAnEvent() function.
    // 2. Prevent creation of the event if this function returns false.
    if (typeof this._vuecal.onEventCreate === 'function') {
      if (!this._vuecal.onEventCreate(event, () => this.deleteAnEvent(event))) return
    }

    // Check if event is a multiple day event and update days count.
    if (event.startDateF !== event.endDateF) {
      event.daysCount = ud.countDays(event.start, event.end)
    }

    // Add event to the mutableEvents array.
    this._vuecal.mutableEvents.push(event)

    // Add the new event to the current view.
    // The event may have been edited on the fly to become a multiple-day event,
    // the method addEventsToView makes sure the segments are created.
    this._vuecal.addEventsToView([event])

    this._vuecal.emitWithEvent('event-create', event)
    this._vuecal.$emit('event-change', { event: this._vuecal.cleanupEvent(event), originalEvent: null })

    return event
  }

  /**
   * Add an event segment (= day) to a multiple-day event.
   *
   * @param {Object} e the multiple-day event to add segment in.
   */
  addEventSegment(e) {
    // If event was previously single-day, event.segments = null,
    // so first create the first segment (first day).
    if (!e.segments) {
      e.segments = {}
      e.segments[ud.formatDateLite(e.start)] = {
        start: e.start,
        startTimeMinutes: e.startTimeMinutes,
        endTimeMinutes: minutesInADay,
        isFirstDay: true,
        isLastDay: false
      }
    }

    // Modify the last segment - which will not stay the last one after this function.
    const previousSegment = e.segments[ud.formatDateLite(e.end)]
    // previousSegment might not exist when dragging too fast, prevent errors.
    if (previousSegment) {
      previousSegment.isLastDay = false
      previousSegment.endTimeMinutes = minutesInADay
    }
    else {
      // @todo: when moving fast might lose the previousSegment.
      // Trying to update it would then result in an error, but do nothing would create a visual bug.
    }

    // Create the new last segment.
    const start = ud.addDays(e.end, 1)
    const formattedDate = ud.formatDateLite(start)
    start.setHours(0, 0, 0, 0)
    e.segments[formattedDate] = {
      start,
      startTimeMinutes: 0,
      endTimeMinutes: e.endTimeMinutes,
      isFirstDay: false,
      isLastDay: true
    }

    e.end = ud.addMinutes(start, e.endTimeMinutes)
    e.daysCount = Object.keys(e.segments).length

    return formattedDate
  }

  /**
   * Remove an event segment (= day) from a multiple-day event.
   *
   * @param {Object} e the multiple-day event to remove segments from.
   */
  removeEventSegment(e) {
    let segmentsCount = Object.keys(e.segments).length
    if (segmentsCount <= 1) return ud.formatDateLite(e.end)

    // Remove the last segment.
    delete e.segments[ud.formatDateLite(e.end)]
    segmentsCount--

    const end = ud.subtractDays(e.end, 1)
    const formattedDate = ud.formatDateLite(end)
    const previousSegment = e.segments[formattedDate]

    // If no more segments, reset the segments attribute to null.
    if (!segmentsCount) e.segments = null

    // previousSegment might not exist when dragging too fast, prevent errors.
    else if (previousSegment) {
      // Modify the new last segment.
      previousSegment.isLastDay = true
      previousSegment.endTimeMinutes = e.endTimeMinutes
    }
    else {
      // @todo: when moving fast might lose the previousSegment.
      // Trying to update it would then result in an error, but do nothing would create a visual bug.
    }

    e.daysCount = segmentsCount || 1
    e.end = end

    return formattedDate
  }

  /**
   * Create 1 segment per day of the given event, but only within the current view.
   * (It won't create segments for all the days in view that are not in the event!)
   *
   * An event segment is a piece of event per day that contains more day-specific data.
   *
   * @param {Object} e the multiple-day event to create segments for.
   * @param {Date} viewStartDate the starting date of the view.
   * @param {Date} viewEndDate the ending date of the view.
   */
  createEventSegments(e, viewStartDate, viewEndDate) {
    const viewStartTimestamp = viewStartDate.getTime()
    const viewEndTimestamp = viewEndDate.getTime()
    let eventStart = e.start.getTime()
    let eventEnd = e.end.getTime()
    let repeatedEventStartFound = false
    let timestamp, end, eventStartAtMidnight

    // @todo: I don't think we still need that:
    // Removing 1 sec when ending at 00:00, so that we don't create a segment for nothing on last day.
    if (!e.end.getHours() && !e.end.getMinutes()) eventEnd -= 1000

    e.segments = {}

    // The goal is to create 1 segment per day in the event, but only within the current view.
    if (!e.repeat) { // Simple case first.
      timestamp = Math.max(viewStartTimestamp, eventStart)
      end = Math.min(viewEndTimestamp, eventEnd)
    }
    else {
      // Start at the beginning of the range, and end at soonest between `repeat.until` if any or range end.
      // This range will most likely be too large (e.g. whole week) and we need to narrow it
      // down in the while loop below.
      // We must not create unused segments, it would break the render or result in weird behaviors.
      timestamp = viewStartTimestamp
      end = Math.min(
        viewEndTimestamp,
        e.repeat.until ? ud.stringToDate(e.repeat.until).getTime() : viewEndTimestamp
      )
    }

    while (timestamp <= end) {
      let createSegment = false
      // Be careful not to simply add 24 hours!
      // In case of DLS, that would cause the event to never end and browser to hang.
      // So use `addDays(1)` instead.
      const nextMidnight = ud.addDays(new Date(timestamp), 1).setHours(0, 0, 0, 0)
      let isFirstDay, isLastDay, start, formattedDate

      if (e.repeat) {
        const tmpDate = new Date(timestamp)
        const tmpDateFormatted = ud.formatDateLite(tmpDate)
        // If the current day in loop is a known date of the repeated event (in `e.occurrences`),
        // then we found the first day of the event repetition, now update the `eventStart` and
        // the end of the loop at current day + event days count.
        if (repeatedEventStartFound || (e.occurrences && e.occurrences[tmpDateFormatted])) {
          if (!repeatedEventStartFound) {
            eventStart = e.occurrences[tmpDateFormatted].start
            eventStartAtMidnight = new Date(eventStart).setHours(0, 0, 0, 0)
            eventEnd = e.occurrences[tmpDateFormatted].end
          }
          repeatedEventStartFound = true
          createSegment = true
        }

        isFirstDay = timestamp === eventStartAtMidnight
        isLastDay = tmpDateFormatted === ud.formatDateLite(new Date(eventEnd))
        start = new Date(isFirstDay ? eventStart : timestamp)
        formattedDate = ud.formatDateLite(start)
        // We want to find any potential other repetition of event in same range.
        if (isLastDay) repeatedEventStartFound = false
      }
      else {
        createSegment = true
        isFirstDay = timestamp === eventStart
        isLastDay = end === eventEnd && nextMidnight > end
        start = isFirstDay ? e.start : new Date(timestamp)
        formattedDate = ud.formatDateLite(isFirstDay ? e.start : start)
      }

      if (createSegment) {
        e.segments[formattedDate] = {
          start,
          startTimeMinutes: isFirstDay ? e.startTimeMinutes : 0,
          endTimeMinutes: isLastDay ? e.endTimeMinutes : minutesInADay,
          isFirstDay,
          isLastDay
        }
      }

      timestamp = nextMidnight
    }

    return e
  }

  /**
   * Delete an event.
   *
   * @param {Object} event the calendar event to delete.
   */
  deleteAnEvent(event) {
    this._vuecal.emitWithEvent('event-delete', event)

    // Delete the event globally.
    this._vuecal.mutableEvents = this._vuecal.mutableEvents.filter(e => e._eid !== event._eid)
    // Delete the event from the current view.
    // checkCellOverlappingEvents() will be re-run automatically from the cell computed events.
    this._vuecal.view.events = this._vuecal.view.events.filter(e => e._eid !== event._eid)
  }

  // EVENT OVERLAPS.
  // ===================================================================
  // Will recalculate all the overlaps of the current cell OR split.
  // cellEvents will contain only the current split events if in a split.
  /**
   *
   * @param {{ _eid: string }[]} cellEvents
   * @param {any} options
   * @returns
   */
  checkCellOverlappingEvents(cellEvents, options) {
    _comparisonArray = cellEvents.slice(0)

    _cellOverlaps = cellEvents.reduce((obj, ev) => ({
      ...obj,
      [ev._eid]: { overlaps: [], start: ev.start, position: 9999 }
    }), {})


    let mostOverlaps = 0
    for (const event of cellEvents) {
      const overlappingEvents = cellEvents.filter(e => {
        return this.eventInRange(event, e.start, e.end) && (e._eid !== event._eid)
      })

      let done = false
      let position = 0
      while (!done) {
        if(overlappingEvents.some(ev => _cellOverlaps[ev._eid].position === position)) {
          position += 1
        } else {
          _cellOverlaps[event._eid] = {
            position: position,
            overlaps: overlappingEvents.map(e => e._eid),
            start: event.start
          }

          done = true;
        }
      }
    }

    const sorted = Object.values(_cellOverlaps).sort((l, r) => r.position - l.position)


    return [_cellOverlaps, sorted[0]?.position  +1 ]
  }

  /**
   * Tells whether an event is in a given date range, even partially.
   *
   * @param {Object} event The event to test.
   * @param {Date} start The start of range date object.
   * @param {Date} end The end of range date object.
   * @return {Boolean} true if in range, even partially.
   */
  eventInRange(event, start, end) {
    // Check if all-day or timeless event (if date but no time there won't be a `:` in event.start).
    if (event.allDay || !this._vuecal.time) {
      // Get the date and discard the time if any, then check it's within the date range.
      const startTimestamp = new Date(event.start).setHours(0, 0, 0, 0)
      const endTimestamp = new Date(event.end).setHours(23, 59, 0, 0)
      return (endTimestamp >= new Date(start).setHours(0, 0, 0, 0) &&
        startTimestamp <= new Date(end).setHours(0, 0, 0, 0))
    }

    const startTimestamp = event.start.getTime()
    const endTimestamp = event.end.getTime()
    return startTimestamp < end.getTime() && endTimestamp > start.getTime()
  }
}
