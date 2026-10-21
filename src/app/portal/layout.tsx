import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal | Moja dadilja",
  description: "Portal za administratore, dadilje i roditelje — dnevnik čuvanja dece.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Moja dadilja",
    statusBarStyle: "black-translucent",
  },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="portal-scope home-theme">{children}</div>;
}
