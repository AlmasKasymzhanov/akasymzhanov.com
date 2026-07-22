#!/usr/bin/env python3
import re
import sys
from pathlib import Path

FILES = [
    ("app/blog/freedom-market/page.tsx", "ru"),
    ("app/en/blog/freedom-market/page.tsx", "en"),
    ("app/blog/nvidia-kazakhstan/page.tsx", "ru"),
    ("app/en/blog/nvidia-kazakhstan/page.tsx", "en"),
    ("app/blog/russia-fuel-jerrycan/page.tsx", "ru"),
    ("app/en/blog/russia-fuel-jerrycan/page.tsx", "en"),
    ("app/blog/why-blogger-brands-fail/page.tsx", "ru"),
    ("app/en/blog/why-blogger-brands-fail/page.tsx", "en"),
]


def shift(text: str, n: int) -> str:
    """Shift text by n spaces (positive = right, negative = left)."""
    result = []
    for line in text.split("\n"):
        if line.strip():
            original_indent = len(line) - len(line.lstrip())
            new_indent = max(0, original_indent + n)
            result.append(" " * new_indent + line.lstrip())
        else:
            result.append("")
    return "\n".join(result)


def first_indent(text: str) -> int:
    """Return the leading spaces of the first non-empty line."""
    for line in text.split("\n"):
        if line.strip():
            return len(line) - len(line.lstrip())
    return 0


def remove_hr_line(text: str) -> str:
    """Remove the first non-empty line if it is the ArticleLayout divider hr."""
    lines = text.split("\n")
    result = []
    removed = False
    for line in lines:
        if not removed and line.strip():
            if re.match(r'<hr className="border-\[var\(--color-border\)\] mb-12" />', line.strip()):
                removed = True
                continue
        result.append(line)
    return "\n".join(result)


def transform(path: str, locale: str) -> None:
    p = Path(path)
    with open(p, "r", encoding="utf-8", newline="") as f:
        content = f.read()
    original = content

    # 1. Remove obsolete imports
    content = re.sub(
        r'import\s+\{\s*ReadTracker\s*\}\s+from\s+"@/components/read-tracker";\r?\n',
        "",
        content,
    )
    content = re.sub(
        r'import\s+\{\s*SiteHeader,\s*SiteFooter,\s*AuthorBlock\s*\}\s+from\s+"@/components/canon/site-chrome";\r?\n',
        "",
        content,
    )
    content = re.sub(
        r'import\s+\{\s*EngagementProvider\s*\}\s+from\s+"@/components/engagement/engagement-provider";\r?\n',
        "",
        content,
    )
    content = re.sub(
        r'import\s+\{\s*EngagementBar\s*\}\s+from\s+"@/components/engagement/engagement-bar";\r?\n',
        "",
        content,
    )
    content = re.sub(
        r'import\s+\{\s*Comments\s*\}\s+from\s+"@/components/engagement/comments";\r?\n',
        "",
        content,
    )

    # 2. Add ArticleLayout import after ArticleHeader
    content = re.sub(
        r'(import\s+\{\s*ArticleHeader\s*\}\s+from\s+"@/components/canon/article-header";)',
        r'\1\nimport { ArticleLayout } from "@/components/canon/article-layout";',
        content,
    )

    # 3. Extract the whole article wrapper and inner content.
    # The leading whitespace before the outer <div> is included in the match so
    # content[:match.start()] ends cleanly on the previous newline.
    article_pattern = re.compile(
        r'[ \t]*<div className="font-mono text-\[var\(--color-text\)\]">\s*'
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
        print(f"ERROR: could not match article wrapper in {path}", file=sys.stderr)
        sys.exit(1)

    slug = match.group(1)
    inner = match.group(2)

    # 4. Split inner into ArticleHeader and the rest.
    # The hero prop is the last prop and is an object literal, so stop there.
    header_end_match = re.search(
        r'^\s*(<ArticleHeader[\s\S]*?hero=\{\{[\s\S]*?\}\s*/>)',
        inner,
    )
    if not header_end_match:
        print(f"ERROR: could not find ArticleHeader in {path}", file=sys.stderr)
        sys.exit(1)

    article_header = inner[: header_end_match.end()].lstrip("\n")
    rest = inner[header_end_match.end() :].lstrip("\n")

    # 5. Remove the hr immediately after ArticleHeader
    rest = remove_hr_line(rest)
    rest = rest.strip("\n")

    # 6. Remove EngagementBar/Comments block at the end of the body
    rest = re.sub(
        r'<div className="mt-12 flex justify-end">\s*<EngagementBar />\s*</div>\s*<Comments />\s*$',
        "",
        rest,
    )
    rest = rest.strip("\n")

    # 7. Shift both header and body left by 4 spaces to match ArticleLayout nesting.
    # Original: header base = 12 spaces, body base = 10 spaces.
    # Target:   header base = 8 spaces, body base = 6 spaces.
    header_reindented = shift_left(article_header, 4)
    body_reindented = shift_left(rest, 4)

    # 8. Assemble the new ArticleLayout wrapper.
    new_article = f'''    <ArticleLayout
      slug="{slug}"
      locale="{locale}"
      header={{
{header_reindented}
      }}
    >
{body_reindented}
    </ArticleLayout>'''

    new_content = content[: match.start()] + new_article + content[match.end() :]

    if new_content == original:
        print(f"WARNING: no changes made to {path}", file=sys.stderr)
    with open(p, "w", encoding="utf-8", newline="") as f:
        f.write(new_content)
    print(f"Updated {path}")


def main() -> None:
    for path, locale in FILES:
        transform(path, locale)


if __name__ == "__main__":
    main()
