import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path) {
    return new Response(JSON.stringify({ error: "Missing path parameter" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { data, error } = await supabaseAdmin.storage
    .from("media")
    .createSignedUrl(path, 604800);

  if (error || !data?.signedUrl) {
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to generate signed URL" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  return new Response(null, {
    status: 302,
    headers: {
      ...corsHeaders,
      "Location": data.signedUrl,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
});
