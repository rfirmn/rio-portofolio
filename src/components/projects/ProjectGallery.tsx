"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECT_CATEGORIES, type ProjectItem } from "@/data";
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon } from "@/components/shared/Icons";

export function ProjectGallery({ project }: { project: ProjectItem }) {
  const coverIndex = project.images.findIndex((image) => image.isCover);
  const [imageIndex, setImageIndex] = useState(Math.max(0, coverIndex));
  const currentImage = project.images[imageIndex];
  const portrait = currentImage.format === "portrait";

  return (
    <figure className="min-w-0">
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-[#dce3e8] sm:aspect-[16/10]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(56,189,248,0.12),transparent_70%)]" />
        <div className={portrait
          ? "absolute inset-y-5 left-1/2 aspect-[9/19] -translate-x-1/2 overflow-hidden rounded-xl border border-foreground/10 bg-white shadow-xl sm:inset-y-6"
          : "absolute inset-0"}>
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes={portrait ? "(min-width: 1024px) 220px, 180px" : "(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"}
          />
        </div>

        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-[#0d121c]/85 px-3 py-1.5 font-mono text-[0.56rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md sm:left-4 sm:top-4">
          {PROJECT_CATEGORIES[project.category]}
        </span>

        {project.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setImageIndex((current) => (current - 1 + project.images.length) % project.images.length)}
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0d121c]/80 text-white transition-colors hover:bg-[#0d121c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`Previous image of ${project.name}`}
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setImageIndex((current) => (current + 1) % project.images.length)}
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0d121c]/80 text-white transition-colors hover:bg-[#0d121c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`Next image of ${project.name}`}
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </>
        )}
      </div>

      <figcaption className="mt-3">
        <div className="flex items-start justify-between gap-3 font-mono text-[0.6rem] text-foreground/65">
          <p aria-live="polite" aria-atomic="true">
            {String(imageIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")} · {currentImage.label}
          </p>
          <a
            href={currentImage.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${currentImage.label} of ${project.name} in full size (new tab)`}
            className="inline-flex shrink-0 items-center gap-1 underline underline-offset-4 hover:text-foreground"
          >
            Full size <ArrowUpRightIcon className="size-3" />
          </a>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-foreground/60">{currentImage.description}</p>
        <div className="mt-2 flex items-center gap-1">
          {project.images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setImageIndex(index)}
              aria-label={`Show ${image.label} of ${project.name}`}
              aria-pressed={imageIndex === index}
              className="flex min-h-7 min-w-7 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className={`h-1.5 rounded-full transition-all ${imageIndex === index ? "w-5 bg-foreground" : "w-1.5 bg-foreground/25"}`} />
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
