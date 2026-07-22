#!/usr/bin/env python3
import re
import sys
from pathlib import Path


def shift_left(text: str, n: int) -> str:
    """Remove n leading spaces from each non-empty line; blank lines become empty."""
    result = []
    for line in text.split("\n"):
        if line.strip():
            original_indent = len(line) - len(line.lstrip())
            new_indent = max(0, original_indent - n)
            result.append(" " * new_indent + line.lstrip())
        else:
            result.append("")
    return "\n".join(result)


def transform(path: str) -> None:
    p = Path(path)
    content = p.read_text(encoding="utf-8")

    article_pattern = re.compile(
        r'\s*<div className="font-mono text-\[var\(--color-text\)\]">\s*'
        r'<div className="max-w-\[1400px\] mx-auto border-x border-\[var\(--color-border\)\] min-h-screen flex flex-col">\s*'
        r'<ReadTracker slug="([^"]+)" />\s*'
        r'<SiteHeader />\s*'
        r'<EngagementProvider slug="[^"]+">\s*'
        r'<article className="w-full max-w-\[680px\] mx-auto px-6 py-12 md:py-20">'
        r'([\s\S]*?)'
        r'</article>\s*</EngagementProvider>\s*'
        r'<div className="flex-1" aria-hidden />\s*'
        r'<AuthorBlock[^>]*/>\s*'
        r'<SiteFooter[^>]*/>\s*'
        r'</div>\s*</div>'
    )
    match = article_pattern.search(content)
    if not match:
        print("no match")
        return

    inner = match.group(2)
    print("INNER START (repr):", repr(inner[:80]))
    print("INNER END (repr):", repr(inner[-80:]))

    header_end_match = re.search(
        r'^\s*(<ArticleHeader[\s\S]*?hero=\{\{[\s\S]*?\}\s*/>)',
        inner,
    )
    if not header_end_match:
        print("no header")
        return

    article_header = inner[:header_end_match.end()]
    print("HEADER START (repr):", repr(article_header[:80]))
    print("HEADER END (repr):", repr(article_header[-80:]))
    print("HEADER MIN_INDENT:", min(len(l)-len(l.lstrip()) for l in article_header.split('\n') if l.strip()))

    rest = inner[header_end_match.end():]
    print("REST START (repr):", repr(rest[:80]))


transform("app/blog/freedom-market/page.tsx")
