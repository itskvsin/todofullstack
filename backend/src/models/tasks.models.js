import mongoose, { Schema } from "mongoose";

const taskSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: String,
      enum: ['Completed', 'Pending', 'Failed'],
      default: 'Pending',
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
