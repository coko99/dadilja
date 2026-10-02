import {
  BookOpen,
  Briefcase,
  Clock,
  Home,
  Hourglass,
  Plane,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "dadilja-po-satu": Timer,
  "dadilja-4-sata": Clock,
  "dadilja-6-sati": Hourglass,
  "dadilja-8-sati": Briefcase,
  guvernanta: BookOpen,
  "live-in": Home,
  "dadilja-na-putovanjima": Plane,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIcons[slug] ?? Clock;
}
