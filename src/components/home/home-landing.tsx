import { GeoVisor } from "./geo-visor/geo-visor";
import { HeroScroll } from "./hero-scroll/hero-scroll";
import { ImpactStats } from "./impact-stats/impact-stats";
import { LogoMarquee } from "./logo-marquee/logo-marquee";
import { PurposeFlow } from "./purpose-flow/purpose-flow";
import { StickyGallery } from "./sticky-gallery/sticky-gallery";
import type { FeaturedCommunity } from "./types";
import { UnlockCta } from "./unlock-cta/unlock-cta";

export function HomeLanding({
  communities,
  totalUsdc,
}: {
  communities: FeaturedCommunity[];
  totalUsdc: number;
}) {
  const featured = communities[0];
  const href = featured ? `/comunidades/${featured.slug}` : "/comunidades";

  return (
    <>
      <HeroScroll />
      <LogoMarquee />
      <PurposeFlow />
      <ImpactStats totalUsdc={totalUsdc} />
      <StickyGallery communities={communities} />
      <GeoVisor communities={communities} />
      <UnlockCta href={href} />
    </>
  );
}
