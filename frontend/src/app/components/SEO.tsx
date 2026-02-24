import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
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
  gaMeasurementId?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://brandonkimathi.com/og-image.jpg",
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterCreator = "@Tech_Nomad5",
  structuredData,
  noindex = false,
  nofollow = false,
  keywords = [],
  author = "Brandon Kimathi",
  publishedTime,
  modifiedTime,
  articleSection,
  imageAlt = "Brandon Kimathi - Software Architecture & System Design",
  locale = "en_US",
  gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID,
}: SEOProps) {
  const location = useLocation();
  const siteUrl = "https://brandonkimathi.com";
  const currentUrl = canonical || `${siteUrl}${location.pathname}`;
  const defaultOgTitle = ogTitle || title;
  const defaultTwitterTitle = twitterTitle || defaultOgTitle;
  const defaultTwitterDescription = twitterDescription || description;

  // Handle multiple structured data objects
  const structuredDataArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  // Build robots directive
  const robotsDirective = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
    "max-image-preview:large",
    "max-snippet:-1",
  ].join(", ");

  // Track page view for Google Analytics
  useEffect(() => {
    if (typeof window.gtag !== "undefined" && gaMeasurementId) {
      window.gtag("config", gaMeasurementId, {
        page_path: location.pathname,
        page_title: title,
        page_location: currentUrl,
      });
    }
  }, [location.pathname, title, currentUrl, gaMeasurementId]);

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />

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

      {/* Profile Specific Meta */}
      {ogType === "profile" && (
        <>
          <meta property="profile:first_name" content="Brandon" />
          <meta property="profile:last_name" content="Kimathi" />
          <meta property="profile:username" content="Tech_Nomad5" />
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
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
      />
      <meta name="theme-color" content="#d97706" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="format-detection" content="telephone=no" />

      {/* Verification & Ownership */}
      <link rel="me" href="https://www.instagram.com/Tech_Nomad5" />
      <link rel="me" href="https://github.com/berry-ramon" />
      <link
        rel="me"
        href="https://www.linkedin.com/in/brandon-kimathi-9542a8301"
      />

      {/* Google Analytics - Global Site Tag */}
      {gaMeasurementId && gaMeasurementId !== "G-XXXXXXXXXX" && (
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
                cookie_domain: 'brandonkimathi.com',
                anonymize_ip: true,
              });
            `}
          </script>
        </>
      )}

      {/* JSON-LD Structured Data */}
      {structuredDataArray.length > 0 &&
        structuredDataArray.map((data, index) => (
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
                  item: `${siteUrl}/${location.pathname
                    .split("/")
                    .slice(0, index + 2)
                    .join("/")}`,
                })),
            ],
          })}
        </script>
      )}
    </Helmet>
  );
}
