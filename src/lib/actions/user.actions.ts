"use server";

import { ConnectToDB } from "@/src/lib/mongoose";
import User from "@/src/lib/models/user.model";
import { revalidatePath } from "next/cache";

 interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
const UpdateUser = async ({
    userId,
    username,
    name,
    bio,
    image,
    path,
  }: Params): Promise<void> => {
    try {
      await ConnectToDB();
      await User.findOneAndUpdate(
        { id: userId },
        { username: username.toLowerCase(), name, bio, image, onboarded: true },
        {
          upsert: true, // updated & insert also ..
        },
      );
      if (path === "/profile/edit") {
        revalidatePath(path);
      }
    } catch (error: any) {
      const _err = `Failed to create user or update user ＞︿＜ : ${error.message}  `;

      console.error(_err);
      throw new Error(_err);
    }
  },
  
  fetchUser = async (userId: string | undefined) => {
    try {
      await ConnectToDB();
      const _userInfo = await User.findOne({ id: userId });
      // .populate({path: 'communities', model: Community});
      return _userInfo;
    } catch (error: any) {
      const _err = `Failed to fetch  user ╯︿╰ : ${error.message}`;

      console.error(_err);
      throw new Error(_err);
    }
  };

  export { UpdateUser, fetchUser };
