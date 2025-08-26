import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  userId: string;
  videoId: string;
  playlistId?: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: String, required: true, index: true },
    videoId: { type: String, required: true, index: true },
    playlistId: { type: String },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

NoteSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const Note = mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);


