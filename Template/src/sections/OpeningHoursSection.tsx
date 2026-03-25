import { Container } from '@/components/Container'
import type { OpeningHoursContent, DayHours, DayOfWeek } from '@/types'

interface Props {
  content: OpeningHoursContent
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday',
  thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
}

const DAY_ORDER: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function todayKey(): DayOfWeek {
  const d = new Date().getDay() // 0 = Sun
  return DAY_ORDER[d === 0 ? 6 : d - 1]
}

function formatHours(entry: DayHours): string {
  if (entry === 'closed') return 'Closed'
  return `${entry.open} – ${entry.close}`
}

export function OpeningHoursSection({ content }: Props) {
  const { sectionTitle, days, holidayNotice } = content
  const today = todayKey()

  return (
    <section id="opening-hours" className="bg-bg py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          </div>

          {holidayNotice && (
            <div className="mb-6 rounded-[--radius] border border-accent bg-accent/10 px-4 py-3 text-center text-sm text-text">
              {holidayNotice}
            </div>
          )}

          <div className="overflow-hidden rounded-[--radius] border border-border shadow-sm">
            <table className="w-full text-sm">
              <tbody>
                {DAY_ORDER.map((day, idx) => {
                  const entry = days[day]
                  const isToday = day === today
                  return (
                    <tr
                      key={day}
                      className={[
                        'flex items-center justify-between px-5 py-3',
                        idx % 2 === 0 ? 'bg-surface' : 'bg-bg',
                        isToday ? 'ring-2 ring-inset ring-primary' : '',
                      ].join(' ')}
                    >
                      <td className={`font-medium ${isToday ? 'text-primary' : 'text-text'}`}>
                        {DAY_LABELS[day]}
                        {isToday && (
                          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-text-inverse">
                            Today
                          </span>
                        )}
                      </td>
                      <td className={entry === 'closed' ? 'text-text-muted' : 'text-text'}>
                        {formatHours(entry)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  )
}
