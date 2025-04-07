import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const METABASE_SITE_URL = "http://localhost:3000";
const METABASE_KEY = "a95b95f969bfc810739b19658c9bbfe6caccbf87ea74ed24b56418ec3f538f7f";

export async function GET() {
  const payload = {
    resource: { dashboard: 2 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // Expire in 10 mins
  };

  const token = jwt.sign(payload, METABASE_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;

  return NextResponse.json({ iframeUrl });
}
