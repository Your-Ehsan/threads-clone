import { Schema, Types, model, models } from "mongoose";

interface TypeUser {
  id: string;
  username: string;
  name: string;
  email: string;
  image?: string;
  bio: string;
  onboarded: boolean;
  threads: { type: Types.ObjectId; ref: string }[];
  communities: { type: Types.ObjectId; ref: string }[];
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<TypeUser>({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Threads",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// 3. Create a Model.
const User = models.User || model<TypeUser>("User", UserSchema);

export default User;

/*
{
  "_id": {
    "$oid": "64d001057bb40756685c2805"
  },
  "id": "user_2TcrINDRS88tloEzhDEv3JTf4zh",
  "__v": 0,
  "bio": "hy 👋, This is EHSAN. 👑",
  "communities": [],
  "image": "https://uploadthing.com/f/f7b1e11b-d55a-4ce4-8c16-3d9875e2b9c7_20220401_194508.jpg",
  "name": "EHSAN.",
  "onboarded": true,
  "threads": [],
  "username": "your-ehsan"
}
*/