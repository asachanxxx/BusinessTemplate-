import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Container } from '@/components/Container'
import type { FAQContent } from '@/types'

interface FAQSectionProps {
  content: FAQContent
}

export function FAQSection({ content }: FAQSectionProps) {
  const { sectionTitle, sectionSubtitle, items } = content

  if (items.length === 0) return null

  return (
    <section id="faq" className="bg-bg-alt py-20">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
