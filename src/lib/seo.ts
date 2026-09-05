import meta from "@/data/meta.json";

/**
 * A page's `alternates` REPLACES the parent's rather than merging, so any page
 * that sets its own canonical also drops the inherited feed link. Spread this
 * into every such page to keep autodiscovery working site-wide.
 */
export const rssAlternate = {
  "application/rss+xml": [
    { url: "/blog/rss.xml", title: `${meta.name} — Blog` },
  ],
};
