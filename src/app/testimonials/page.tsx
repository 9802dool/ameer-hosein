import { TestimonialSlider } from "@/components/testimonials";
import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Testimonials",
  description: "Words and films from students and clients of Ameer Hosein.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Students and clients"
        title="Testimonials"
        lede="Quote cards and student films. Add Reel links or MP4s in content/testimonials.ts."
      />
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <TestimonialSlider />
      </div>
    </>
  );
}
