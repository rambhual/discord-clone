import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request, res: Response) {
  const { name, imageUrl } = await req.json();
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: {
            profileId: profile.id,
            name: "general",
          },
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER ERROR]", error);
    return new NextResponse("Internal Server Error ", { status: 500 });
  }
}
