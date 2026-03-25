"use client";

import { useState, useRef, useEffect } from "react";
import { track } from "@vercel/analytics";

type Variant = "compact" | "full";

interface ShareButtonsProps {
  url: string;
  title: string;
  variant?: Variant;
}

const CHANNELS = [
  {
    id: "copy",
    label: "Скопировать ссылку",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
  },
  {
    id: "threads",
    label: "Threads",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.276 3.249-.838 1.028-2.084 1.62-3.703 1.757-1.199.102-2.36-.157-3.263-.726-.993-.624-1.59-1.54-1.681-2.578-.168-1.92 1.456-3.56 4.306-3.56.856 0 1.634.098 2.328.287-.084-1.14-.555-1.99-1.407-2.539-.6-.387-1.38-.594-2.255-.594l-.02.001c-1.044.01-1.882.298-2.49.857l-1.4-1.47c.93-.855 2.176-1.322 3.609-1.39l.553.003c1.4.08 2.581.478 3.51 1.186 1.086.826 1.733 2.024 1.925 3.565l.013.123c.9.343 1.69.84 2.345 1.49.987 1.078 1.538 2.467 1.59 4.015.065 1.87-.584 3.706-1.828 5.17C18.609 22.88 15.895 23.975 12.186 24zm-.09-10.678c-1.717 0-2.485.756-2.44 1.27.025.278.199.558.492.79.39.31.96.468 1.61.413 1.03-.088 1.787-.455 2.252-1.09.3-.41.516-.952.639-1.608a7.167 7.167 0 00-2.553-.475z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://www.threads.net/intent/post?text=${encodeURIComponent(`${title}\n${url}`)}`,
  },
] as const;

const ShareIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function ShareButtons({ url, title, variant = "compact" }: ShareButtonsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleShare(channelId: string) {
    const channel = CHANNELS.find((c) => c.id === channelId)!;

    track("share", { channel: channelId, url });

    // Supabase event tracking
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: url.split("/").pop(), event_type: "share", channel: channelId }),
    }).catch(() => {});

    if (channelId === "copy") {
      navigator.clipboard.writeText(url);
      setCopied("copy");
      setTimeout(() => setCopied(null), 2000);
      return;
    }

    if ("getUrl" in channel) {
      window.open(channel.getUrl(url, title), "_blank", "noopener,noreferrer");
    }

    setOpen(false);
  }

  if (variant === "compact") {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-dim)]/60 hover:text-[var(--color-text)] transition-colors cursor-pointer"
          aria-label="Поделиться"
        >
          <ShareIcon />
          <span className="translate-y-[2px]">Поделиться</span>
        </button>

        {open && (
          <div className="absolute right-0 top-8 z-50 min-w-[200px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
            {CHANNELS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleShare(ch.id)}
                className="flex items-center gap-3 w-full px-4 py-2.5 font-mono text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors text-left cursor-pointer"
              >
                <span className="shrink-0 opacity-60">{ch.icon}</span>
                <span className="flex-1">
                  {copied === ch.id ? "Скопировано!" : ch.label}
                </span>
                {copied === ch.id && (
                  <span className="shrink-0 text-[#22c55e]"><CheckIcon /></span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // variant === "full"
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-dim)] mb-4">Поделиться</p>
      <div className="flex flex-wrap items-center gap-5">
        {CHANNELS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => handleShare(ch.id)}
            className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <span className="shrink-0 opacity-50">{ch.icon}</span>
            <span>
              {copied === ch.id ? "Скопировано!" : ch.label}
            </span>
            {copied === ch.id && (
              <span className="shrink-0 text-[#22c55e]"><CheckIcon /></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
