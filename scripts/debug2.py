#!/usr/bin/env python3
import re
from pathlib import Path

p = Path("app/blog/freedom-market/page.tsx")
content = p.read_text(encoding="utf-8")

patterns = [
    r'<div className="font-mono text-\[var\(--color-text\)\]">',
    r'<div className="max-w-\[1400px\] mx-auto border-x border-\[var\(--color-border\)\] min-h-screen flex flex-col">',
    r'<ReadTracker slug="[^"]+" />',
    r'<SiteHeader />',
    r'<EngagementProvider slug="[^"]+">',
    r'<article className="w-full max-w-\[680px\] mx-auto px-6 py-12 md:py-20">',
    r'</article>',
    r'</EngagementProvider>',
    r'<div className="flex-1" aria-hidden />',
    r'<AuthorBlock[^>]*/>',
    r'<SiteFooter[^>]*/>',
    r'</div>',
]

for pat in patterns:
    m = re.search(pat, content)
    print(pat, "->", bool(m))
