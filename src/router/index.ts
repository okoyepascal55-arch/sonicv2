import { useNavigate, useLocation, Navigate, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect, createElement } from "react";
import routes from "./config";
import { useSitePages } from "@/lib/sitePages";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pages = useSitePages();
  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(window.REACT_APP_NAVIGATE);
  });
  // Page switched off in Dashboard → Seiten: forward to its parent page.
  if (!pages.isOn(pathname)) {
    return createElement(Navigate, { to: pages.redirectFor(pathname), replace: true });
  }
  return element;
}
