"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/prijava") || pathname.startsWith("/en") || !visible) return null;
  const href = pathname.startsWith("/za-dadilje") ? "/prijava-za-dadilje" : "/#upit";
  const label = pathname.startsWith("/za-dadilje") ? "Prijavi se" : "Pronađi dadilju";
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[rgba(82,33,16,0.12)] bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <Button href={href} variant="accent" className="w-full">
        {label}
      </Button>
    </div>
  );
}
