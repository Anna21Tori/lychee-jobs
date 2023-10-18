import { Session } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";

export const obtaintNewAccessToken = (session: Session) => {
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