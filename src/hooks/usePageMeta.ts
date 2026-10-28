import { useEffect } from "react";

const DEFAULT_DESCRIPTION = "SOLAE is a teen-run swim label: plain, double-lined swimsuits with removable pads, knee-length matching shorts and cover-ups.";

/** set the tab title and meta description for the current page */
export function usePageMeta(title: string, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
