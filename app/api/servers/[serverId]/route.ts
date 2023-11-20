import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";


export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
   try {
      const profile = await currentProfile();
      const { name, imageUrl } = await req.json();

      if (!profile) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      const server = await db.server.update({
         where: {
            id: params.serverId,
            profileId: profile.id
         },
         data: {
            name, imageUrl
         }
      })

      return NextResponse.json(server)
   } catch (error) {
      console.log("SERVER_PATCH", error)
      return new NextResponse("Internal server error", { status: 500 })
   }
}


export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
   try {
      const profile = await currentProfile();

      if (!profile) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!params.serverId) {
         return new NextResponse("Server id not found", { status: 400 });
      }

      const server = await db.server.delete({
         where: {
            id: params.serverId,
            profileId: profile.id
         }
      })

      return NextResponse.json(server)
   } catch (error) {
      console.log("SERVER_PATCH", error)
      return new NextResponse("Internal server error", { status: 500 })
   }
}