import { getSocialLinks } from "@/lib/social";

// Compact, icon-only row of the site's social links — used at the top of
// the page (announcement bar) so visitors don't have to scroll to the
// footer to find them. Colors are passed in by the caller since this is
// reused on both light (header) and dark (announcement bar) backgrounds.
export function SocialLinks({
  iconSize = 14,
  className = "",
  linkClassName = "text-ink hover:text-accent",
}: {
  iconSize?: number;
  className?: string;
  linkClassName?: string;
}) {
  const socialLinks = getSocialLinks();

  return (
    <div className={`flex items-center ${className}`}>
      {socialLinks.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`flex h-7 w-7 items-center justify-center transition-colors ${linkClassName}`}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
