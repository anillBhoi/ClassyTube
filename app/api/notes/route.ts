import { connectionToDatabase } from "@/lib/mongoose";
import { Note } from "@/models/NoteModel";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");
    if (!videoId) return NextResponse.json({ error: "Missing videoId" }, { status: 400 });

    await connectionToDatabase();
    const note = await Note.findOne({ userId, videoId });
    return NextResponse.json({ content: note?.content || "" });
  } catch (error) {
    console.error("GET /api/notes error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { videoId, playlistId, content } = body || {};
    if (!videoId) return NextResponse.json({ error: "Missing videoId" }, { status: 400 });

    await connectionToDatabase();
    const note = await Note.findOneAndUpdate(
      { userId, videoId },
      { $set: { playlistId, content: content || "" } },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error("PUT /api/notes error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { videoId } = body || {};
    if (!videoId) return NextResponse.json({ error: "Missing videoId" }, { status: 400 });

    await connectionToDatabase();
    await Note.findOneAndDelete({ userId, videoId });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/notes error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


