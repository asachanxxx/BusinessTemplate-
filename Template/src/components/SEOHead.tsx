import { Helmet } from 'react-helmet-async'
import type { SEOConfig, BusinessInfo } from '@/types'

interface SEOHeadProps {
  seo: SEOConfig
  business: BusinessInfo
}

export function SEOHead({ seo, business }: SEOHeadProps) {
  const siteName = business.name

  return (
    <Helmet>
      {/* Primary */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={siteName} />
      <meta property="og:title"       content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.canonicalUrl && <meta property="og:url" content={seo.canonicalUrl} />}
      {seo.ogImage      && <meta property="og:image" content={seo.ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card"        content={seo.ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title"       content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
    </Helmet>
  )
}
