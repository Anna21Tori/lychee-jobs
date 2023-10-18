import { obtaintNewAccessToken } from "@/app/utils/helpers";
import { getSupabase } from "@/app/utils/supabase";
import { Session, getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const POST = withApiAuthRequired(async function handle(req: any){
  const res = NextResponse.next();
  const session = await getSession(req, res) as Session;
  const accessToken = obtaintNewAccessToken(session);
  const supabase = await getSupabase(accessToken);
  const body = await req.json();

  const data = await supabase?.from("offers").select().range(body.from , body.to);
  return NextResponse.json(data);
});

export {POST};