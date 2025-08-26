import { connectionToDatabase } from "@/lib/mongoose";
import { Progress } from "@/models/ProgressModel";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");
    await connectionToDatabase();
    const query: any = { userId };
    if (playlistId) query.playlistId = playlistId;
    const docs = await Progress.find(query);
    const byVideo: Record<string, { completed: boolean; progress: number }> = {};
    for (const d of docs) {
      byVideo[d.videoId] = { completed: !!d.completed, progress: d.progress || 0 };
    }
    return NextResponse.json({ progressByVideo: byVideo });
  } catch (error) {
    console.error("GET /api/progress error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { videoId, playlistId, completed, progress } = body || {};
    if (!videoId) return NextResponse.json({ error: "Missing videoId" }, { status: 400 });

    await connectionToDatabase();
    const doc = await Progress.findOneAndUpdate(
      { userId, videoId },
      {
        $set: {
          playlistId,
          completed: typeof completed === "boolean" ? completed : false,
          progress: typeof progress === "number" ? progress : 0,
        },
      },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, progress: doc });
  } catch (error) {
    console.error("PUT /api/progress error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


