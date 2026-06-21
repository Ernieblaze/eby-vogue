import { SocialLinks } from "@/components/SocialLinks";

export function AnnouncementBar() {
  return (
    <div className="bg-ink py-2">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <p className="flex-1 truncate text-xs font-medium tracking-wide text-accent sm:text-sm">
          Free delivery in Port Harcourt on orders over ₦50,000
        </p>
        <SocialLinks
          iconSize={14}
          className="flex-shrink-0 gap-1"
          linkClassName="text-accent hover:text-surface"
        />
      </div>
    </div>
  );
}
