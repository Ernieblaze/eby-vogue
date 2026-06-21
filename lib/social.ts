import type { ComponentType } from "react";
import { MessageCircle, Music2 } from "lucide-react";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558752482136";
export const TIKTOK_URL = "https://www.tiktok.com/@ebyvoguefooties";

export type SocialLink = {
  name: string;
  // Longer label used as the visible link text in the footer.
  footerLabel: string;
  href: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

// Single source of truth for the site's social links — used by the
// footer and the compact header/announcement-bar icon row alike.
export function getSocialLinks(): SocialLink[] {
  return [
    {
      name: "WhatsApp",
      footerLabel: "WhatsApp Us",
      href: buildGeneralWhatsAppLink(),
      Icon: MessageCircle,
    },
    {
      name: "Facebook",
      footerLabel: "Facebook",
      href: FACEBOOK_URL,
      Icon: FacebookIcon,
    },
    {
      name: "TikTok",
      footerLabel: "TikTok",
      href: TIKTOK_URL,
      Icon: Music2,
    },
  ];
}
