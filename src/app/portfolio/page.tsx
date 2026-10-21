import { PortfolioGallery } from "@/components/gallery";
import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Portfolio",
  description:
    "Portraits, fashion, weddings, Fujifilm, travel, and published photographs by Ameer Hosein.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected work"
        title="Portfolio"
        lede="Portraits and models, fashion, weddings, Fujifilm, travel, and work that has already been published. Swap the placeholders for the real frames."
      />
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <PortfolioGallery />
      </div>
    </>
  );
}
