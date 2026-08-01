import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ALLOWED_EVENTS = new Set(["read_depth", "share"]);
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,119}$/;

export async function POST(req: NextRequest) {
  const { slug, event_type, channel, metadata } = await req.json();
  if (typeof slug !== "string" || !SLUG_RE.test(slug) || typeof event_type !== "string" || !ALLOWED_EVENTS.has(event_type))
    return NextResponse.json({ error: "slug and event_type required" }, { status: 400 });

  const safeChannel = typeof channel === "string" ? channel.slice(0, 40) : null;
  const serializedMetadata = metadata && typeof metadata === "object" ? JSON.stringify(metadata) : "";
  const safeMetadata = serializedMetadata.length > 0 && serializedMetadata.length <= 1000 ? metadata : null;

  const supabase = getSupabase();
  const { error } = await supabase.from("events").insert({
    slug,
    event_type,
    channel: safeChannel,
    metadata: safeMetadata,
    referrer: req.headers.get("referer") || null,
    user_agent: req.headers.get("user-agent") || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const event_type = req.nextUrl.searchParams.get("event_type");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = getSupabase();
  let query = supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  if (event_type) query = query.eq("event_type", event_type);

  const { count, error } = await query;
  if (error) return NextResponse.json({ count: 0 });

  return NextResponse.json({ count: count || 0 });
}
