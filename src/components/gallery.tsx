"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { portfolioCategories, portfolioImages, type PortfolioCategory } from "@content/portfolio";

export function PortfolioGallery() {
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  function chooseFilter(id: PortfolioCategory | "all") {
    setFilter(id);
    setActive(null);
  }
  const dialog = useRef<HTMLDialogElement>(null);
  const images = portfolioImages.filter((image) => filter === "all" || image.category === filter);
  const category = portfolioCategories.find((item) => item.id === filter);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (active === null) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
  }, [active]);

  const current = active === null ? null : images[active];

  return (
    <div>
      <div className="flex gap-2 overflow-auto pb-4" role="toolbar" aria-label="Filter portfolio">
        <FilterButton current={filter} id="all" onSelect={chooseFilter}>
          All
        </FilterButton>
        {portfolioCategories.map((item) => (
          <FilterButton key={item.id} current={filter} id={item.id} onSelect={chooseFilter}>
            {item.label}
          </FilterButton>
        ))}
      </div>
      {category && "href" in category ? (
        <p className="mb-6 text-sm text-muted">
          More of this work lives on{" "}
          <a className="text-ink underline" href={category.href} target="_blank" rel="noreferrer">
            {category.handle}
          </a>
          .
        </p>
      ) : null}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden"
            onClick={() => setActive(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-105"
            />
            <Watermark />
          </button>
        ))}
      </div>
      <dialog ref={dialog} aria-label="Photograph" onClose={() => setActive(null)}>
        {current ? (
          <div className="bg-paper p-3 text-ink">
            <div className="mb-3 flex justify-between gap-3">
              <p className="text-sm text-muted">{current.alt}</p>
              <button className="min-h-11 px-3 text-sm" onClick={() => dialog.current?.close()}>
                Close
              </button>
            </div>
            <div className="relative">
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="max-h-[75vh] w-full object-contain"
                sizes="100vw"
              />
              <Watermark />
            </div>
            <div className="mt-3 flex justify-between">
              <button
                className="min-h-11 px-3 text-sm"
                onClick={() => setActive((index) => (index === null ? 0 : (index + images.length - 1) % images.length))}
              >
                Previous
              </button>
              <button
                className="min-h-11 px-3 text-sm"
                onClick={() => setActive((index) => (index === null ? 0 : (index + 1) % images.length))}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function FilterButton({
  current,
  id,
  onSelect,
  children,
}: {
  current: string;
  id: PortfolioCategory | "all";
  onSelect: (id: PortfolioCategory | "all") => void;
  children: React.ReactNode;
}) {
  const selected = current === id;
  return (
    <button
      aria-pressed={selected}
      className={`min-h-11 shrink-0 border px-4 text-sm ${selected ? "border-accent bg-accent text-black" : "border-line text-ink"}`}
      onClick={() => onSelect(id)}
    >
      {children}
    </button>
  );
}

function Watermark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-ah.svg" alt="" className="pointer-events-none absolute bottom-3 right-3 h-8 w-8" />
  );
}
