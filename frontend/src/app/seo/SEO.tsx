import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import {
  personStructuredData,
  organizationStructuredData,
  websiteStructuredData,
} from "./structuredData";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      params?: Record<string, any>,
    ) => void;
    dataLayer: any[];
  }
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile" | undefined;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCreator?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
  nofollow?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  imageAlt?: string;
  locale?: string;
  gaMeasurementId?: string; // Made optional
  children?: ReactNode; // Properly typed
}

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://brandonkimathi.vercel.app/logo.png",
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterCreator = "@Tech_Nomad5",
  structuredData = [],
  noindex = false,
  nofollow = false,
  keywords = [],
  author = "Brandon Kimathi",
  publishedTime,
  modifiedTime,
  articleSection,
  imageAlt = "Brandon Kimathi - Software Architecture & System Design",
  locale = "en_US",
  gaMeasurementId, // Remove default import.meta.env value
  children,
}: SEOProps) {
  const location = useLocation();
  const siteUrl = "https://brandonkimathi.vercel.app";
  const currentUrl = canonical || `${siteUrl}${location.pathname}`;
  const defaultOgTitle = ogTitle || title;
  const defaultTwitterTitle = twitterTitle || defaultOgTitle;
  const defaultTwitterDescription = twitterDescription || description;

  // Handle multiple structured data objects
  const structuredDataArray = [
    personStructuredData,
    organizationStructuredData,
    websiteStructuredData,
    ...(structuredData
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : []),
  ];

  // Build robots directive
  const robotsDirective = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
    "max-image-preview:large",
    "max-snippet:-1",
    "max-video-preview:-1",
  ].join(", ");

  // Track page view for Google Analytics (only if gaMeasurementId is provided)
  useEffect(() => {
    if (gaMeasurementId && typeof window.gtag !== "undefined") {
      window.gtag("config", gaMeasurementId, {
        page_path: location.pathname,
        page_title: title,
        page_location: currentUrl,
      });
    }
  }, [location.pathname, title, currentUrl, gaMeasurementId]);

  // Track performance metrics (only if gaMeasurementId is provided)
  useEffect(() => {
    if (gaMeasurementId && typeof window.gtag !== "undefined") {
      // Track Core Web Vitals
      if ("performance" in window && "getEntriesByType" in performance) {
        const paintMetrics = performance.getEntriesByType("paint");
        paintMetrics.forEach((metric) => {
          if (metric.name === "first-contentful-paint") {
            window.gtag("event", "performance", {
              event_category: "Core Web Vitals",
              event_label: "FCP",
              value: Math.round(metric.startTime),
            });
          }
        });
      }
    }
  }, [gaMeasurementId]);

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <meta name="bingbot" content={robotsDirective} />

      {/* Language & Locale */}
      <meta property="og:locale" content={locale} />
      <html lang={locale.split("_")[0]} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Brandon Kimathi" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={defaultOgTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:type" content="image/png" />

      {/* Article Specific Meta */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {ogType === "article" && (
        <meta property="article:author" content={author} />
      )}

      {/* Profile Specific Meta */}
      {ogType === "profile" && (
        <>
          <meta property="profile:first_name" content="Brandon" />
          <meta property="profile:last_name" content="Kimathi" />
          <meta property="profile:username" content="Tech_Nomad5" />
          <meta property="profile:gender" content="male" />
        </>
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Tech_Nomad5" />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={defaultTwitterTitle} />
      <meta name="twitter:description" content={defaultTwitterDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Mobile & PWA */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
      />
      <meta name="theme-color" content="#d97706" />
      <meta name="msapplication-TileColor" content="#0a0a0a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Verification & Ownership */}
      <link rel="me" href="https://www.instagram.com/Tech_Nomad5" />
      <link rel="me" href="https://github.com/berry-ramon" />
      <link
        rel="me"
        href="https://www.linkedin.com/in/brandon-kimathi-9542a8301"
      />
      <link rel="me" href="https://twitter.com/Tech_Nomad5" />

      {/* DNS Prefetch & Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Google Analytics - Global Site Tag (only if gaMeasurementId is provided) */}
      {gaMeasurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                send_page_view: false,
                cookie_flags: 'SameSite=None;Secure',
                cookie_domain: 'brandonkimathi.vercel.app',
                anonymize_ip: true,
                allow_google_signals: true,
                allow_ad_personalization_signals: false,
                link_attribution: true
              });
              
              // Track outbound links
              document.addEventListener('click', function(e) {
                const target = e.target.closest('a');
                if (target && target.href && target.hostname !== window.location.hostname) {
                  gtag('event', 'click', {
                    event_category: 'outbound',
                    event_label: target.href,
                    transport_type: 'beacon'
                  });
                }
              });
            `}
          </script>
        </>
      )}

      {/* JSON-LD Structured Data */}
      {structuredDataArray.map((data, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

      {/* BreadcrumbList Schema - Auto-generated for nested routes */}
      {location.pathname !== "/" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              ...location.pathname
                .split("/")
                .filter(Boolean)
                .map((segment, index) => ({
                  "@type": "ListItem",
                  position: index + 2,
                  name: segment
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" "),
                  item: `${siteUrl}${location.pathname
                    .split("/")
                    .slice(0, index + 2)
                    .join("/")}`,
                })),
            ],
          })}
        </script>
      )}

      {/* Allow additional Helmet children */}
      {children}
    </Helmet>
  );
}
