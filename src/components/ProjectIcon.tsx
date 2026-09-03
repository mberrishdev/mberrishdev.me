const PATHS: Record<string, React.ReactNode> = {
  panel: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M9 4.5v2.5a1.5 1.5 0 0 0 1.5 1.5h3A1.5 1.5 0 0 0 15 7V4.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20.5 12a8.5 8.5 0 1 1-2.8-6.3" />
      <path d="M20.5 4.5v5h-5" />
    </>
  ),
  scan: (
    <>
      <path d="M3.5 8.5v-3a2 2 0 0 1 2-2h3M15.5 3.5h3a2 2 0 0 1 2 2v3M20.5 15.5v3a2 2 0 0 1-2 2h-3M8.5 20.5h-3a2 2 0 0 1-2-2v-3" />
      <path d="M7.5 12h9" />
    </>
  ),
  qr: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" />
      <rect x="13.5" y="3.5" width="7" height="7" />
      <rect x="3.5" y="13.5" width="7" height="7" />
      <path d="M13.5 13.5h3.5v3.5h-3.5zM20.5 17v3.5H17" />
    </>
  ),
  document: (
    <>
      <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" />
      <path d="M14 3.5v5h5" />
      <path d="M9 13h6M9 16.5h4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.5l1.7 4.6 4.6 1.7-4.6 1.7L11 16.1 9.3 11.5 4.7 9.8l4.6-1.7z" />
      <path d="M17.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  tunnel: (
    <>
      <circle cx="4.75" cy="12" r="2.25" />
      <circle cx="19.25" cy="12" r="2.25" />
      <path d="M7.5 12h9" />
      <path d="M13.75 9.25L16.5 12l-2.75 2.75" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3.5v17h16" />
      <path d="M7.5 15.5l4-5 3 3 5-7" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8.5" y="2.5" width="7" height="4" rx="1.2" />
      <path d="M15.5 4.5H17a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h1.5" />
      <path d="M8.5 12h7M8.5 16h4.5" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M7 9.5l3 2.5-3 2.5M13 15h4.5" />
    </>
  ),
  gamepad: (
    <>
      <rect x="2.5" y="7" width="19" height="10" rx="5" />
      <path d="M7 10.5v3M5.5 12h3M16 11h.01M18.5 13.5h.01" />
    </>
  ),
  wallet: (
    <>
      <path d="M3.5 8a2 2 0 0 1 2-2h11" />
      <rect x="3.5" y="8" width="17" height="11" rx="2" />
      <path d="M16 13.5h2" />
    </>
  ),
  pulse: <path d="M3 12h4l2.5-6.5 4 13L16 12h5" />,
  book: (
    <>
      <path d="M4.5 5.5a2 2 0 0 1 2-2h13v17h-13a2 2 0 0 1-2-2z" />
      <path d="M8.5 8h7M8.5 11.5h7" />
    </>
  ),
  exchange: (
    <>
      <path d="M4 8.5h13M14 5.5l3 3-3 3" />
      <path d="M20 15.5H7M10 12.5l-3 3 3 3" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.5 17.5a8.5 8.5 0 1 1 17 0" />
      <path d="M12 17.5l4.5-5.5" />
      <circle cx="12" cy="17.5" r="1.2" />
    </>
  ),
  check: (
    <>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M8 2.5v4M16 2.5v4M3.5 9.5h17" />
      <path d="M9.5 14.5l2 2 3.5-3.5" />
    </>
  ),
  package: (
    <>
      <path d="M20.5 8L12 3.5 3.5 8v8L12 20.5 20.5 16z" />
      <path d="M3.5 8l8.5 4.5L20.5 8M12 12.5v8" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8z" />
      <path d="M3.5 13.5L12 18l8.5-4.5" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9.5a6 6 0 1 0-12 0c0 5.5-2 6.5-2 6.5h16s-2-1-2-6.5" />
      <path d="M10.3 19.5a2 2 0 0 0 3.4 0" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V6" />
      <path d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
    </>
  ),
};

export default function ProjectIcon({ name, size = 17 }: { name: string; size?: number }) {
  const glyph = PATHS[name] ?? PATHS.package;

  return (
    <svg
      className="picon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
