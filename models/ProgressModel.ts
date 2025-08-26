import mongoose, { Schema, Document } from "mongoose";

export interface IProgress extends Document {
  userId: string;
  playlistId?: string;
  videoId: string;
  completed: boolean;
  progress?: number;
  updatedAt: Date;
  createdAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: String, required: true, index: true },
    playlistId: { type: String },
    videoId: { type: String, required: true },
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const Progress = mongoose.models.Progress || mongoose.model<IProgress>("Progress", ProgressSchema);


