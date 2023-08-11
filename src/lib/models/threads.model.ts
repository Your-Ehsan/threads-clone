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

/*

{
  "_id": {
    "$oid": "64d09fc8e5b7fd483c6db8f8"
  },
  "text": "This is First Thread created by me while developing 👩‍💻",
  "author": {
    "$oid": "64d001057bb40756685c2805"
  },
  "community": null,
  "children": [
    {
      "$oid": "64d4b2663daa524d91efb078"
    }
  ],
  "createdAt": {
    "$date": "2023-08-07T07:39:52.440Z"
  },
  "__v": 1
}

comment thread look like this 🔪
{
  "_id": {
    "$oid": "64d4b2663daa524d91efb078"
  },
  "text": "nice 🤣 |  just a testing comment",
  "author": {
    "$oid": "64d001057bb40756685c2805"
  },
  "parentId": "64d09fc8e5b7fd483c6db8f8",
  "children": [],
  "createdAt": {
    "$date": "2023-08-10T09:48:22.660Z"
  },
  "__v": 0
}

*/