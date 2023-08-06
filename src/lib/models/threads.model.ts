import { Schema, Types, model, models } from "mongoose";

interface TypeThreads {
  text: string;
  children: Types.ObjectId[];
  author: {
    required: boolean;
    ref: string;
    tyoe: Types.ObjectId;
  };
  createdAt: Date;
  community: Types.ObjectId;
  parentId: string;
}

// 2. Create a Schema corresponding to the document interface.
const ThreadSchema = new Schema<TypeThreads>({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Threads",
    },
  ],
});

// 3. Create a Model.
const Threads = models.Threads || model<TypeThreads>("Threads", ThreadSchema);

export default Threads;
