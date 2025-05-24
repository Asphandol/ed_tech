'use client'

import { Calendar, dateFnsLocalizer, SlotInfo, Event as RBCEvent } from 'react-big-calendar'
import { useState } from 'react'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

type Event = {
  id: string
  title: string
  start: Date
  end: Date
}

export default function SessionCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null)

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    const title = prompt('Enter session title:')
    if (title) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title,
        start: slotInfo.start,
        end: slotInfo.end,
      }
      setEvents([...events, newEvent])
    }
  }

  const handleEventClick = (event: RBCEvent) => {
    const shouldDelete = window.confirm(`Delete session "${event.title}"?`)
    if (shouldDelete) {
      setEvents(events.filter(e => e.id !== (event as Event).id))
    }
  }

  const eventStyleGetter = (event: Event) => {
    const backgroundColor = '#3b82f6'
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    }
    return {
      style,
    }
  }

  return (
    <div className="h-[650px] w-full bg-white rounded-lg shadow-md">
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week']}
        step={30}
        timeslots={2}
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 19, 0)}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
        style={{ height: '100%', padding: '1rem' }}
      />
    </div>
  )
}