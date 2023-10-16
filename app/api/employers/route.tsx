import { getSupabase } from "@/app/utils/supabase";
import { Session, getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const obtaintNewAccessToken = (session: Session) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const token = jwt.sign(
    payload,
    process.env.SUPABASE_SIGNING_SECRET ? process.env.SUPABASE_SIGNING_SECRET : ""
  );

  return token;
}

const GET = withApiAuthRequired(async function handle(req: any){
    const res = NextResponse.next();
    const session = await getSession(req, res) as Session;
    const accessToken = obtaintNewAccessToken(session);
    const supabase = await getSupabase(accessToken);
    
    const data = await supabase?.from("companies").select();
   return NextResponse.json(data);
});

const POST = withApiAuthRequired(async function handle(req){
  const res = NextResponse.next();
  const session = await getSession(req, res) as Session;
  const {user:{sub}} = session;
  const accessToken = obtaintNewAccessToken(session);
  const supabase = await getSupabase(accessToken);
  const body = await req.json()
  
  const data = await supabase?.from("companies").insert({... body, user_id: sub});
  
  return NextResponse.json(data);
});

const PATCH = withApiAuthRequired(async function handle(req){
  const res = NextResponse.next();
  const session = await getSession(req, res) as Session;
  const {user:{sub}} = session;
  const accessToken = obtaintNewAccessToken(session);
  const supabase = await getSupabase(accessToken);
  const body = await req.json()
  
  const data = await supabase?.from("companies").update({... body, user_id: sub}).eq('id', body.id);
  
  return NextResponse.json(data);
});

export {GET, POST, PATCH};