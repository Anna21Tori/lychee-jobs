import { Session, handleAuth, handleCallback } from "@auth0/nextjs-auth0";

import jwt from "jsonwebtoken";

const afterCallback = async (req: any, res: any, session: Session) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const token = jwt.sign(
    payload,
    process.env.SUPABASE_SIGNING_SECRET ? process.env.SUPABASE_SIGNING_SECRET : ""
  );
  
  Object.assign(session, {... session, user: {... session.user, accessToken: token}});

//   session.user['accessToken'] = jwt.sign(
//     payload,
//     process.env.SUPABASE_SIGNING_SECRET ? process.env.SUPABASE_SIGNING_SECRET : ""
//   );

  return session;
};

handleAuth({
  async callback(req: any, res: any) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

export const GET = handleAuth();