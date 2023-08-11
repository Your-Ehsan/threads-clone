"use server";

import { ConnectToDB } from "@/src/lib/mongoose";
import { revalidatePath } from "next/cache";
import User from "@/src/lib/models/user.model";
import Threads from "../models/threads.model";
import { FilterQuery, SortOrder } from "mongoose";

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
  },
  fetchUserPosts = async (userId: string) => {
    try {
      await ConnectToDB();
      // Find all threads authored by the user with the given userId
      const threads = await User.findOne({ id: userId }).populate({
        path: "threads",
        model: Threads,
        populate: [
          // {
          //   path: "community",
          //   model: Community,
          //   select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
          // },
          {
            path: "children",
            model: Threads,
            populate: {
              path: "author",
              model: User,
              select: "name image id", // Select the "name" and "_id" fields from the "User" model
            },
          },
        ],
      });
      return threads;
    } catch (error: any) {
      const _err = `Failed to fetch user threads ╯︿╰ : ${error.message}`;

      console.error(_err);
      throw new Error(_err);
    }
  },
  fetchUsers = async ({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
  }: {
    userId: string;
    searchString: string;
    pageNumber: number;
    pageSize: number;
    sortBy: SortOrder;
  }) => {
    try {
      await ConnectToDB();

      const skipAmount = (pageNumber - 1) * pageSize,
        regex = new RegExp(searchString, "i"),
        query: FilterQuery<typeof User> = {
          id: { $ne: userId },
        },
        sortOPtions = { createdAt: sortBy },
        usersQuery = User.find(query)
          .sort(sortOPtions)
          .limit(pageSize)
          .skip(skipAmount),
        totalUsers = await User.countDocuments(query),
        users = await usersQuery.exec(),
        isNext = totalUsers > skipAmount + users.length;

      if (searchString.trim() !== "") {
        query.$or = [
          { username: { $regex: regex } },
          { name: { $regex: regex } },
        ];
      }

      return { isNext, users };
    } catch (error: any) {
      const _err = `Failed to fetch user that your are trying to find  ¯\_(ツ)_/¯ : ${error.message}`;

      console.error(_err);

      throw new Error(_err);
    }
  },

  getActivity = async (userId: string) => {
    try {
      await ConnectToDB();
      const UserThreads = await Threads.find({ author: userId }),
        ChildThreadIds = UserThreads.reduce((accumulator, userThread) => {
          return accumulator.concat(userThread.children);
        }, []),
        replies = await Threads.find({
          _id: { $in: ChildThreadIds },
          author: { $ne: userId },
        }).populate({
          path: "author",
          model: User,
          select: "name image _id",
        });

      return replies;
    } catch (error: any) {
      const _err = `Failed to get Activity ＞︿＜ : ${error.message}`;
      console.error(_err);
      throw new Error(_err);
    }
  };

export { UpdateUser, fetchUser, fetchUserPosts, fetchUsers, getActivity };
