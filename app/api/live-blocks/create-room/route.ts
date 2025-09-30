// app/api/liveblocks/create-room/route.ts  (Next.js 13+)
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { roomName } = await req.json();

  const resp = await fetch("https://api.liveblocks.io/v2/rooms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: `${roomName}-${Math.random().toString(36).slice(2, 8)}`, // generate unique id
      defaultAccesses: ["room:write"], // who can write
      metadata: {
        title: roomName,
      },
      initialStorage: {
        todos: [{ id: "1", text: "Welcome!", done: false }],
      },
    }),
  });

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }

  const data = await resp.json();
  return NextResponse.json(data);
}
