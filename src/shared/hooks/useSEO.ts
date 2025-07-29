import { useEffect } from 'react';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
  structuredData?: object;
}

const setMetaTag = (name: string, content: string, property?: boolean) => {
  const attributeName = property ? 'property' : 'name';
  let metaTag = document.querySelector(`meta[${attributeName}="${name}"]`);
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeName, name);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
};

const setCanonicalLink = (url: string) => {
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  
  canonicalLink.href = url;
};

const setStructuredData = (data: object) => {
  let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  
  scriptTag.textContent = JSON.stringify(data);
};

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // Meta description
    if (seoData.description) {
      setMetaTag('description', seoData.description);
    }

    // Keywords
    if (seoData.keywords) {
      setMetaTag('keywords', seoData.keywords);
    }

    // Robots
    if (seoData.robots) {
      setMetaTag('robots', seoData.robots);
    }

    // Open Graph
    if (seoData.ogTitle) {
      setMetaTag('og:title', seoData.ogTitle, true);
    }
    
    if (seoData.ogDescription) {
      setMetaTag('og:description', seoData.ogDescription, true);
    }
    
    if (seoData.ogImage) {
      setMetaTag('og:image', seoData.ogImage, true);
    }
    
    if (seoData.ogUrl) {
      setMetaTag('og:url', seoData.ogUrl, true);
    }

    // Twitter Card
    if (seoData.twitterTitle) {
      setMetaTag('twitter:title', seoData.twitterTitle);
    }
    
    if (seoData.twitterDescription) {
      setMetaTag('twitter:description', seoData.twitterDescription);
    }
    
    if (seoData.twitterImage) {
      setMetaTag('twitter:image', seoData.twitterImage);
    }

    // Canonical URL
    if (seoData.canonical) {
      setCanonicalLink(seoData.canonical);
    }

    // Structured Data
    if (seoData.structuredData) {
      setStructuredData(seoData.structuredData);
    }

  }, [seoData]);
}; 