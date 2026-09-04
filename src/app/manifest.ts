import { MetadataRoute } from "next";
import meta from "@/data/meta.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mikheil Berishvili — Full-Stack Developer",
    short_name: "Mikheil B.",
    description: meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F0E8",
    theme_color: "#F4F0E8",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
