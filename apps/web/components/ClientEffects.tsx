"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Recreates the two pieces of "vanilla" behaviour that the original
 * static export relied on client-side JS bundles for:
 *
 *  1. Scroll-reveal animations: elements carrying a `reveal`,
 *     `reveal-left`, `reveal-right` or `reveal-scale` class (see
 *     globals.css) fade/slide into place the first time they enter
 *     the viewport, by toggling a `.visible` class.
 *
 *  2. Newsletter / contact forms: since this static export has no
 *     backend, submitting a form just shows a friendly inline
 *     confirmation instead of doing a real network request. Wire your
 *     own API route or form handler here when you're ready.
 *
 * This component is mounted once in the root layout, so it persists
 * across client-side navigations (it never unmounts when you click a
 * <Link>). Every effect below is keyed off `pathname` so it re-queries
 * the DOM and re-attaches on every route change -- without that, a page
 * you navigate to client-side would keep its .reveal elements stuck at
 * opacity: 0 (invisible) until a full page refresh remounted everything.
 */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const forms = document.querySelectorAll<HTMLFormElement>(
      "form.newsletter-form, form.booking-form, form.contact-form"
    );

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      // eslint-disable-next-line no-console
      console.log("Form submitted (no backend wired up yet):", form.id || form.className);
      form.reset();
    };

    forms.forEach((f) => f.addEventListener("submit", handleSubmit as EventListener));
    return () => {
      forms.forEach((f) => f.removeEventListener("submit", handleSubmit as EventListener));
    };
  }, [pathname]);

  // "Read Full Write-Up" accordions (engagement-details page): each
  // .btn-read-more toggles the .event-full-text block that follows it.
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(".btn-read-more");
    if (buttons.length === 0) return;

    const handleClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const extra = btn.previousElementSibling as HTMLElement | null;
      if (!extra || !extra.classList.contains("event-full-text")) return;
      const open = extra.classList.toggle("is-open");
      const icon = btn.querySelector("i");
      if (icon) icon.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
      btn.childNodes[0].nodeValue = open ? "Read Less " : "Read Full Write-Up ";
    };

    buttons.forEach((b) => b.addEventListener("click", handleClick));
    return () => buttons.forEach((b) => b.removeEventListener("click", handleClick));
  }, [pathname]);

  // Poster "click to zoom" (giraffe-manor page): elements carrying
  // [data-poster-src] open the image full-size in a simple lightbox.
  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>("[data-poster-src]");
    if (wrappers.length === 0) return;

    let overlay: HTMLDivElement | null = null;

    const close = () => {
      overlay?.remove();
      overlay = null;
      document.removeEventListener("keydown", onKeydown);
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const open = (src: string, alt: string) => {
      overlay = document.createElement("div");
      overlay.className = "poster-lightbox-overlay";
      overlay.innerHTML = `
        <button type="button" class="poster-lightbox-close" aria-label="Close">&times;</button>
        <img src="${src}" alt="${alt.replace(/"/g, "&quot;")}" class="poster-lightbox-img" />
      `;
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay || (e.target as HTMLElement).closest(".poster-lightbox-close")) {
          close();
        }
      });
      document.body.appendChild(overlay);
      document.addEventListener("keydown", onKeydown);
    };

    const handleClick = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const src = el.dataset.posterSrc;
      const alt = el.querySelector("img")?.getAttribute("alt") || "";
      if (src) open(src, alt);
    };

    wrappers.forEach((w) => w.addEventListener("click", handleClick));
    return () => {
      wrappers.forEach((w) => w.removeEventListener("click", handleClick));
      close();
    };
  }, [pathname]);

  // "Watch our story" video modal (about page): any .btn-secondary whose
  // text includes "Watch" opens the story video in a modal overlay.
  useEffect(() => {
    const btns = Array.from(
      document.querySelectorAll<HTMLElement>(".btn-secondary")
    ).filter((b) => b.textContent?.includes("Watch"));
    if (btns.length === 0) return;

    let overlay: HTMLDivElement | null = null;

    const close = () => {
      const video = overlay?.querySelector("video");
      video?.pause();
      overlay?.remove();
      overlay = null;
      document.removeEventListener("keydown", onKeydown);
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const open = () => {
      overlay = document.createElement("div");
      overlay.className = "video-modal-overlay";
      overlay.innerHTML = `
        <div class="video-modal-box">
          <button type="button" class="video-modal-close" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <video controls autoplay style="width:100%;border-radius:8px;display:block;">
            <source src="/images/Arlink28.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      `;
      overlay.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target === overlay || target.closest(".video-modal-close")) close();
      });
      document.body.appendChild(overlay);
      document.addEventListener("keydown", onKeydown);
    };

    const handleClick = (e: Event) => {
      e.preventDefault();
      open();
    };

    btns.forEach((b) => b.addEventListener("click", handleClick));
    return () => {
      btns.forEach((b) => b.removeEventListener("click", handleClick));
      close();
    };
  }, [pathname]);

  return null;
}
