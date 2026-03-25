import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Label, Input } from '@/components/ui/form-fields'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { BookingContent } from '@/types'

interface BookingSectionProps {
  content: BookingContent
}

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  phone:   z.string().min(7, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  date:    z.string().min(1, 'Please choose a date'),
  time:    z.string().min(1, 'Please choose a time'),
  notes:   z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM',  '1:30 PM',  '2:00 PM',  '2:30 PM',
  '3:00 PM',  '3:30 PM',  '4:00 PM',  '4:30 PM',
]

export function BookingSection({ content }: BookingSectionProps) {
  const { sectionTitle, sectionSubtitle, services, apiEndpoint, externalProvider } = content
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true)
    setServerError(null)
    try {
      await axios.post(apiEndpoint, data)
      setSubmitted(true)
      reset()
    } catch {
      setServerError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  // Compute today's date as YYYY-MM-DD for the min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="booking" className="bg-bg-alt py-20">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        {/* External provider (Calendly, SimplyBook, etc.) */}
        {externalProvider ? (
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              src={externalProvider.url}
              title="Booking"
              width="100%"
              height={externalProvider.height ?? 600}
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin"
            />
          </div>
        ) : (
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-bg p-8 shadow-card">
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text">Booking Received!</h3>
              <p className="text-text-muted">
                Thanks for booking with us. We'll confirm your appointment within 1 hour.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Book another appointment
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Row: Name + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="booking-name">Full name *</Label>
                  <Input
                    id="booking-name"
                    placeholder="Jane Smith"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'booking-name-err' : undefined}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p id="booking-name-err" role="alert" className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="booking-email">Email address *</Label>
                  <Input
                    id="booking-email"
                    type="email"
                    placeholder="jane@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'booking-email-err' : undefined}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p id="booking-email-err" role="alert" className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row: Phone + Service */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="booking-phone">Phone number *</Label>
                  <Input
                    id="booking-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'booking-phone-err' : undefined}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p id="booking-phone-err" role="alert" className="text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="booking-service">Service *</Label>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="booking-service"
                          aria-invalid={!!errors.service}
                          aria-describedby={errors.service ? 'booking-service-err' : undefined}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.service && (
                    <p id="booking-service-err" role="alert" className="text-xs text-red-500">
                      {errors.service.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row: Date + Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="booking-date">Preferred date *</Label>
                  <Input
                    id="booking-date"
                    type="date"
                    min={today}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? 'booking-date-err' : undefined}
                    {...register('date')}
                  />
                  {errors.date && (
                    <p id="booking-date-err" role="alert" className="text-xs text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="booking-time">Preferred time *</Label>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="booking-time"
                          aria-invalid={!!errors.time}
                          aria-describedby={errors.time ? 'booking-time-err' : undefined}
                        >
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((slot) => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.time && (
                    <p id="booking-time-err" role="alert" className="text-xs text-red-500">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-notes">Additional notes</Label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  placeholder="Anything we should know before your appointment..."
                  className="flex min-h-[80px] w-full resize-none rounded border border-border bg-bg px-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('notes')}
                />
              </div>

              {/* Server error */}
              {serverError && (
                <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                  {serverError}
                </p>
              )}

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Sending...' : 'Request Appointment'}
              </Button>
            </form>
          )}
        </div>
        )}
      </Container>
    </section>
  )
}
