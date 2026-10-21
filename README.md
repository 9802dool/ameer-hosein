# AH | Ameer Hosein

Personal brand site for Ameer Hosein: photographer, photography lecturer, and content creator in Trinidad and Tobago. Built with Next.js, TypeScript, and Tailwind, and ready for Vercel.

## Edit the site

All copy, prices, dates, and product records live in typed files:

| File | What it controls |
| --- | --- |
| `content/site.ts` | Name, phone, WhatsApp, navigation, socials |
| `content/home.ts` | Hero, intro, stats |
| `content/courses.ts` | FOP price, schedule, next cycle date, FAQ, Pro Class |
| `content/portfolio.ts` | Gallery images and categories |
| `content/testimonials.ts` | Quotes, Reel URLs, and MP4 paths |
| `content/collaborations.ts` | Partner cards and the press link |
| `content/about.ts` | About story |
| `content/products.ts` | Shop products, variants, stock, prices |
| `content/shop.ts` | Delivery fees and bank-transfer details |
| `content/instagram.json` | The feed grid. Update this file directly. No Instagram API. |

Replace the labelled JPEGs in `public/images`. Keep the same file names, or change the path in the content file that points at them. The monogram is `public/logo-ah.svg`. It is used in the header, favicon, loading screen, footer, and as a watermark.

The next FOP start date is `nextCycleStarts` in `content/courses.ts`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Email

Forms, order receipts, and the shop notification use [Resend](https://resend.com).

- `RESEND_API_KEY`
- `EMAIL_FROM` — a sender on a domain you have verified in Resend
- `CONTACT_TO_EMAIL` — where Ameer receives enrolments, contact notes, brand enquiries, and orders

Until those are set, the forms stay valid and tell the visitor to use WhatsApp.

## Shop and payments

Products are read through `getProducts()` in `src/lib/catalog.ts`, so the same shape can later move to a CMS or database without rewriting the pages.

Checkout offers:

1. Card, through WiPay. The provider lives in `src/lib/payments/wipay.ts` and is selected with `PAYMENT_PROVIDER`.
2. Bank transfer, using the details in `content/shop.ts`. The order reference is the order id.
3. Pay on pickup or delivery.
4. Order via WhatsApp, which sends the bag summary to `+1 (868) 345-5632`.

WiPay uses the hosted Payments API. Sandbox testing uses account number `1234567890` and API key `123` (the key is only for verifying the return hash; never put it in client code). Set `WIPAY_ENVIRONMENT=live` and the real account values before taking cards. `NEXT_PUBLIC_SITE_URL` must be the public site URL so WiPay can return the buyer to `/api/payments/wipay`.

Digital presets email a download link only after payment is confirmed. The placeholder file is `private/downloads/ah-lightroom-presets.txt`. Replace it with the real pack and keep `downloadFile` in `content/products.ts` pointed at the filename.

Gift vouchers email a code, `AH-GIFT-` plus the order id, once the order is paid.

Bank transfer and pay-on-delivery orders stay pending until you mark them paid:

```bash
curl -X POST https://your-domain/api/orders/mark-paid \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: $ORDER_ADMIN_SECRET" \
  -d "{\"token\":\"PASTE_THE_ORDER_TOKEN\"}"
```

The token is the `token` query on the confirmation URL. Set `ORDER_SIGNING_SECRET` and `ORDER_ADMIN_SECRET` to long random strings before launch. Orders are carried in a signed token rather than a database, which is enough for email receipts and downloads. Move `quoteOrder` onto a database when you want an order dashboard.

Delivery fees in `content/shop.ts` are starter figures. Change them before the shop goes live.

## Deploy on Vercel

1. Push the repository to GitHub.
2. Import it in Vercel, or deploy the already linked `ameer-hosein` project.
3. Add the variables from `.env.example` in the project settings. Use the production URL for `NEXT_PUBLIC_SITE_URL`.
4. Deploy. The framework preset is Next.js.

```bash
npx vercel --prod
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
