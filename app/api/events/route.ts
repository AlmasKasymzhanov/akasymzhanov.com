import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { slug, event_type, channel, metadata } = await req.json();
  if (!slug || !event_type)
    return NextResponse.json({ error: "slug and event_type required" }, { status: 400 });

  const supabase = getSupabase();
  const { error } = await supabase.from("events").insert({
    slug,
    event_type,
    channel: channel || null,
    metadata: metadata || null,
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
