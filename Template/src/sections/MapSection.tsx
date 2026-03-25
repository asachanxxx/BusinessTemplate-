import type { ContactInfo } from '@/types'

interface MapSectionProps {
  contactInfo: ContactInfo
}

export function MapSection({ contactInfo }: MapSectionProps) {
  if (!contactInfo.mapEmbedUrl) return null

  return (
    <section id="map" aria-label="Location map" className="h-[400px] w-full overflow-hidden">
      <iframe
        src={contactInfo.mapEmbedUrl}
        title="Business location map"
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </section>
  )
}
