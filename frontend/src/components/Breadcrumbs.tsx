import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PATH_LABELS: Record<string, string> = {
  work: "Work",
  about: "About",
  contact: "Contact",
  "how-i-think": "How I think",
  kodees: "KODÈS",
  terms: "Terms",
  privacy: "Privacy",
  "payment-platform": "Payment Platform",
  "admin-system": "Admin System",
  "analytics-engine": "Analytics Engine",
  "api-gateway": "API Gateway",
};

export function Breadcrumbs() {
  const { pathname } = useLocation();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      document
        .querySelectorAll('script[data-breadcrumb="true"]')
        .forEach((el) => el.remove());
      return;
    }

    const items = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://brandonkimathi.top/",
      },
      ...segments.map((seg, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: PATH_LABELS[seg] || seg,
        item: `https://brandonkimathi.top/${segments.slice(0, i + 1).join("/")}`,
      })),
    ];

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    });
    script.dataset.breadcrumb = "true";

    document
      .querySelectorAll('script[data-breadcrumb="true"]')
      .forEach((el) => el.remove());
    document.head.appendChild(script);

    return () => {
      document
        .querySelectorAll('script[data-breadcrumb="true"]')
        .forEach((el) => el.remove());
    };
  }, [pathname]);

  return null;
}
