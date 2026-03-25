import { useState } from 'react'
import { Container } from '@/components/Container'
import type { ScheduleContent, DayOfWeek, ClassLevel } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  content: ScheduleContent
}

const LEVEL_COLORS: Record<ClassLevel, string> = {
  beginner:     'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced:     'bg-red-100 text-red-800',
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

export function ScheduleSection({ content }: Props) {
  const { sectionTitle, sectionSubtitle, classes } = content
  const days = Array.from(new Set(classes.map((c) => c.day))) as DayOfWeek[]
  const [activeDay, setActiveDay] = useState<DayOfWeek>(days[0])

  const filtered = classes.filter((c) => c.day === activeDay)

  if (classes.length === 0) return null

  return (
    <section id="schedule" className="bg-bg-alt py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        {/* Day tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={cn(
                'rounded-[--radius] border px-5 py-2 text-sm font-medium transition-colors',
                activeDay === day
                  ? 'border-primary bg-primary text-text-inverse'
                  : 'border-border bg-surface text-text hover:border-primary hover:text-primary',
              )}
            >
              {DAY_LABELS[day]}
            </button>
          ))}
        </div>

        {/* Class cards */}
        {filtered.length === 0 ? (
          <p className="text-center text-text-muted">No classes scheduled for this day.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cls) => (
              <li
                key={cls.id}
                className="flex flex-col gap-2 rounded-[--radius] border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-text">{cls.name}</h3>
                  {cls.level && (
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                        LEVEL_COLORS[cls.level],
                      )}
                    >
                      {cls.level}
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-primary">
                  {cls.time}
                  <span className="ml-2 text-text-muted">· {cls.duration}</span>
                </p>

                {cls.trainer && (
                  <p className="text-sm text-text-muted">with {cls.trainer}</p>
                )}

                {cls.href && (
                  <a
                    href={cls.href}
                    className="mt-auto text-xs font-medium text-primary underline-offset-2 hover:underline"
                  >
                    Book this class
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
