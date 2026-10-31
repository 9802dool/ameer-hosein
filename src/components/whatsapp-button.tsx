import { site, whatsappLink } from "@content/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi Ameer, I found you through your site.")}
      className="fixed right-4 bottom-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#075E54] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.65)] transition hover:brightness-110"
      target="_blank"
      rel="noreferrer"
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sr-only">Message {site.name} on WhatsApp</span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l6-1.6A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.6.9.9-3.5-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
