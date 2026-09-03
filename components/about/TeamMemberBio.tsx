"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";

import { getBioPreview } from "@/lib/text";

type TeamMemberBioProps = {
  name: string;
  pronouns: string;
  position: string;
  bio: string;
  /**
   * The same URL the card's headshot uses. Passing it in rather than rebuilding it keeps
   * `urlFor` on the server, and an identical URL means the dialog's image is a cache hit
   * rather than a second download per member.
   */
  imageUrl: string;
};

/**
 * A team member's bio, shortened on the card with the full text in a dialog.
 *
 * The only client boundary in the team grid — the card around it stays a server component,
 * so the JavaScript cost per member stays small as the roster grows.
 *
 * Built on the native <dialog> with showModal(), which provides focus trapping,
 * Escape-to-close, top-layer stacking, inerting of the page behind, and focus restoration
 * to the trigger. Those are the parts hand-rolled modals usually get wrong.
 */
export default function TeamMemberBio({
  name,
  pronouns,
  position,
  bio,
  imageUrl,
}: TeamMemberBioProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const headingId = useId();

  const { preview, isTruncated } = getBioPreview(bio);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }, []);

  // A modal dialog does not stop the page behind it from scrolling, so lock it here.
  // Cleanup restores the previous value rather than clearing it outright, so this cannot
  // clobber a scroll lock some other component set.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!preview) {
    // Published without a bio yet — render nothing rather than an empty paragraph.
    return null;
  }

  if (!isTruncated) {
    return (
      <p className="mt-2 text-left font-sans text-sm font-light text-white-text">{preview}</p>
    );
  }

  return (
    <>
      <p className="mt-2 text-left font-sans text-sm font-light text-white-text">
        {preview}{" "}
        <button
          type="button"
          onClick={open}
          // Not accent-coloured: #a3b18a on the section's #344e41 is only 4.0:1, under the
          // 4.5:1 needed for body text. White text keeps the accent as a hairline instead.
          className="font-poppins text-sm font-semibold whitespace-nowrap text-white-text underline decoration-accent-bg decoration-2 underline-offset-4 transition-colors hover:decoration-white-text focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bg"
        >
          Read more
          <span className="sr-only"> about {name}</span>
        </button>
      </p>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        onCancel={close}
        onClick={(event) => {
          // Clicks inside the content bubble up to the dialog, so only treat a click whose
          // target is the dialog itself as a backdrop click.
          if (event.target === dialogRef.current) {
            close();
          }
        }}
        className="team-bio-dialog m-auto w-[min(34rem,calc(100vw-2rem))] rounded-2xl bg-base-bg p-0 text-tertiary shadow-2xl backdrop:bg-tertiary/70 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[min(80vh,44rem)] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-full border-4 border-accent-bg sm:block">
                <Image src={imageUrl} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="text-left">
                <h3 id={headingId} className="font-poppins text-lg font-bold text-tertiary">
                  {name}
                </h3>
                <p className="font-sans text-sm text-tertiary/70">({pronouns})</p>
                <p className="font-poppins text-sm font-semibold text-primary">{position}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="-mt-1 -mr-1 shrink-0 rounded-full p-2 text-tertiary transition-colors hover:bg-accent-bg/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="sr-only">Close</span>
              <HiXMark className="h-5 w-5" />
            </button>
          </div>

          <hr className="my-5 border-t border-accent-bg" />

          <p className="text-left font-sans text-sm leading-relaxed font-light whitespace-pre-line text-tertiary">
            {bio}
          </p>
        </div>
      </dialog>
    </>
  );
}
