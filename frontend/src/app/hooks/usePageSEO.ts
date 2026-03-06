// src/hooks/usePageSEO.ts
import { useLocation } from "react-router-dom";
import { pageSEO } from "../seo/pageSEO";
import { useEffect, useState } from "react";

export interface ProjectData {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  publishedDate: string;
  modifiedDate: string;
  category: string;
}

export const usePageSEO = (projectData?: ProjectData) => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<any>(null);

  useEffect(() => {
    // Determine which page we're on
    const path = location.pathname;

    if (path === "/") {
      setSeoData(pageSEO.home);
    } else if (path.startsWith("/work/") && projectData) {
      const projectId = path.split("/")[2];
      setSeoData(pageSEO.project(projectId, projectData));
    } else if (path === "/about") {
      setSeoData(pageSEO.about);
    } else if (path === "/how-i-think") {
      setSeoData(pageSEO.howIThink);
    } else if (path === "/contact") {
      setSeoData(pageSEO.contact);
    } else if (path === "/kodees") {
      setSeoData(pageSEO.kodees);
    } else {
      setSeoData(pageSEO.home);
    }
  }, [location.pathname, projectData]);

  return seoData;
};
