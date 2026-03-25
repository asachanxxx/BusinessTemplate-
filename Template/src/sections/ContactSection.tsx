import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Label, Input, Textarea } from '@/components/ui/form-fields'
import type { ContactContent, BusinessInfo } from '@/types'

interface ContactSectionProps {
  content: ContactContent
  business: BusinessInfo
}

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  phone:   z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormValues = z.infer<typeof schema>

export function ContactSection({ content, business }: ContactSectionProps) {
  const { sectionTitle, sectionSubtitle, apiEndpoint } = content
  const { contactInfo } = business

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
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
      setServerError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-bg py-20">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Contact info sidebar */}
          <aside aria-label="Contact information">
            <h3 className="mb-6 text-lg font-semibold text-text">Contact Information</h3>
            <ul className="flex flex-col gap-5">
              {contactInfo.phone && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="mt-0.5 text-text underline-offset-2 hover:underline"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </li>
              )}
              {contactInfo.email && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="mt-0.5 break-all text-text underline-offset-2 hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Address</p>
                    <address className="mt-0.5 not-italic text-text">{contactInfo.address}</address>
                  </div>
                </li>
              )}
            </ul>
          </aside>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-bg-alt p-8">
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
                <h3 className="text-2xl font-bold text-text">Message Sent!</h3>
                <p className="text-text-muted">
                  Thanks for reaching out. We'll get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-name">Your name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="Jane Smith"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-err' : undefined}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p id="contact-name-err" role="alert" className="text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-email">Email address *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="jane@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-err' : undefined}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p id="contact-email-err" role="alert" className="text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone (optional) */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-phone">Phone number (optional)</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register('phone')}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-err' : undefined}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p id="contact-message-err" role="alert" className="text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                    {serverError}
                  </p>
                )}

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
