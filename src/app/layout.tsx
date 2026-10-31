import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { site, siteUrl } from "@content/site";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/components/shop/cart";
import { JsonLd } from "@/lib/seo";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const url = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: site.title,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  keywords: [
    "photography course Trinidad",
    "photography classes Chaguanas",
    "Ameer Hosein",
    "Fundamentals of Photography",
    "photographer Trinidad",
  ],
  openGraph: {
    title: site.title,
    description: site.description,
    locale: "en_TT",
    type: "website",
    url,
  },
  icons: { icon: "/logo-ah.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.name,
      jobTitle: "Photographer, photography lecturer and content creator",
      url,
      telephone: site.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.location.name,
        addressLocality: site.location.area,
        addressCountry: "TT",
      },
      sameAs: site.socials.map((item) => item.href),
    },
    {
      "@type": "LocalBusiness",
      name: site.title,
      url,
      telephone: site.phoneTel,
      image: `${url}/logo-ah.svg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.location.name,
        addressLocality: site.location.area,
        addressRegion: "Trinidad",
        addressCountry: "TT",
      },
      areaServed: "Trinidad and Tobago",
    },
  ],
};

const themeScript = `(function(){try{if(localStorage.getItem("ah-theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} dark h-full scroll-smooth antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <JsonLd data={structuredData} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
