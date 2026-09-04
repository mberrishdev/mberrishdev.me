import meta from "@/data/meta.json";
import companiesData from "@/data/companies.json";
import projectsData from "@/data/projects.json";

/**
 * A single JSON-LD @graph rather than several disconnected blobs.
 *
 * Every node has a stable @id so the nodes reference each other instead of
 * repeating themselves. That is what lets a search engine or an LLM resolve
 * "Mikheil Berishvili" to one entity with employers, skills and software
 * attached — rather than to the Georgian basketball player who currently owns
 * this name in most knowledge graphs.
 */

const SITE = meta.siteUrl;

export const ID = {
  website: `${SITE}/#website`,
  person: `${SITE}/#person`,
  profilePage: `${SITE}/#profilepage`,
  organization: (name: string) =>
    `${SITE}/#org-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
} as const;

type Company = (typeof companiesData.companies)[number];

/** Employers, as Organization nodes the Person can point at. */
function organizationNodes() {
  return companiesData.companies.map((c: Company) => ({
    "@type": "Organization",
    "@id": ID.organization(c.name),
    name: c.name,
    ...(c.link && c.link !== "#" ? { url: c.link } : {}),
    ...(c.logo ? { logo: `${SITE}${c.logo}` } : {}),
  }));
}

/**
 * Employment history using schema.org's Role indirection: the property is
 * repeated inside the Role node, so Person -> worksFor -> OrganizationRole ->
 * worksFor -> Organization. This is the only way to attach dates to an
 * employment relationship without inventing properties.
 *
 * Dates are emitted only when present in companies.json, so a half-filled
 * dataset degrades to a valid (if less rich) graph rather than invalid schema.
 */
function employmentRoles() {
  return companiesData.companies.map((c: Company) => ({
    "@type": "OrganizationRole",
    roleName: c.role,
    ...(c.startDate ? { startDate: c.startDate } : {}),
    ...(!c.current && c.endDate ? { endDate: c.endDate } : {}),
    worksFor: { "@id": ID.organization(c.name) },
  }));
}

type Project = (typeof projectsData.projects)[number];

/** Projects that are real, reachable software get a node of their own. */
function softwareNodes() {
  return projectsData.projects
    .filter(
      (p: Project) =>
        (p.liveLink && p.liveLink !== "#") ||
        (p.githubLink && p.githubLink !== "#")
    )
    .map((p: Project) => {
      const url = p.liveLink && p.liveLink !== "#" ? p.liveLink : p.githubLink;
      return {
        "@type": "SoftwareApplication",
        "@id": `${SITE}/#software-${p.id}`,
        name: p.title,
        description: p.description,
        url,
        ...(p.githubLink && p.githubLink !== "#"
          ? { codeRepository: p.githubLink }
          : {}),
        applicationCategory: "DeveloperApplication",
        operatingSystem: inferOperatingSystem(p.technologies),
        author: { "@id": ID.person },
        creator: { "@id": ID.person },
        keywords: p.technologies.join(", "),
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      };
    });
}

function inferOperatingSystem(technologies: string[]): string {
  const tech = technologies.map((t) => t.toLowerCase());
  if (tech.some((t) => t.includes("macos") || t.includes("swift"))) return "macOS";
  if (tech.some((t) => t.includes("electron"))) return "macOS, Windows";
  return "Web";
}

export function buildGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ID.website,
        url: SITE,
        name: meta.title,
        description: meta.description,
        inLanguage: "en",
        publisher: { "@id": ID.person },
        copyrightHolder: { "@id": ID.person },
      },
      {
        "@type": "ProfilePage",
        "@id": ID.profilePage,
        url: SITE,
        name: meta.title,
        description: meta.description,
        isPartOf: { "@id": ID.website },
        about: { "@id": ID.person },
        mainEntity: { "@id": ID.person },
        inLanguage: "en",
        primaryImageOfPage: `${SITE}${meta.avatar}`,
      },
      {
        "@type": "Person",
        "@id": ID.person,
        name: meta.name,
        givenName: meta.givenName,
        familyName: meta.familyName,
        alternateName: meta.alternateName,
        url: SITE,
        mainEntityOfPage: { "@id": ID.profilePage },
        image: {
          "@type": "ImageObject",
          url: `${SITE}${meta.avatar}`,
          width: 512,
          height: 512,
          caption: meta.name,
        },
        description: meta.shortDescription,
        // The single most important line for entity disambiguation.
        disambiguatingDescription: meta.disambiguation,
        jobTitle: meta.jobTitle,
        hasOccupation: {
          "@type": "Occupation",
          name: "Full-Stack Software Developer",
          occupationalCategory: "15-1252.00", // O*NET: Software Developers
          skills: meta.knowsAbout.join(", "),
        },
        worksFor: employmentRoles(),
        nationality: {
          "@type": "Country",
          name: meta.nationality,
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: meta.addressCountry,
        },
        email: `mailto:${meta.email}`,
        telephone: meta.telephone,
        knowsAbout: meta.knowsAbout,
        knowsLanguage: [
          { "@type": "Language", name: "Georgian", alternateName: "ka" },
          { "@type": "Language", name: "English", alternateName: "en" },
        ],
        sameAs: Object.values(meta.socials),
      },
      ...organizationNodes(),
      ...softwareNodes(),
      {
        "@type": "ItemList",
        "@id": `${SITE}/#projects`,
        name: "Projects by Mikheil Berishvili",
        numberOfItems: projectsData.projects.length,
        itemListElement: projectsData.projects.map((p: Project, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          description: p.description,
        })),
      },
    ],
  };
}
