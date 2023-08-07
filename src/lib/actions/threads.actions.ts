"use server";
import { ConnectToDB } from "@/src/lib/mongoose";
import Threads from "@/src/lib/models/threads.model";
import User from "@/src/lib/models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  path: string;
  author: string;
  communityId: string | null;
}
const createThread = async ({ text, author, communityId, path }: Params) => {
    try {
      await ConnectToDB();
      const _CreateThread = await Threads.create({
        text,
        author,
        // communityId,
        community: null,
      });
      await User.findByIdAndUpdate(author, {
        $push: { threads: _CreateThread._id },
      }).then(() => revalidatePath(path));
    } catch (error: any) {
      const _err = `Failed to create thread ╯︿╰ : ${error.message}`;

      console.error(_err);
      throw new Error(_err);
    }
  },
  fetchThreads = async (pgNum = 1, pgSize = 20) => {
    try {
      await ConnectToDB();

      const SkipThreads = (pgNum - 1) * pgSize,
        ThreadsQuery = Threads.find({
          parentId: { $in: [null, undefined] },
        })
          .sort({ createdAt: "desc" })
          .skip(SkipThreads)
          .limit(pgSize)
          .populate({ path: "author", model: User })
          .populate({
            path: "children",
            populate: {
              path: "author",
              model: User,
              select: "_id name parentId image",
            },
          }),
        TotalThreads: number = await Threads.countDocuments({
          parentId: { $in: [null, undefined] },
        }),
        _threads = await ThreadsQuery.exec(),
        isNext: boolean = TotalThreads > SkipThreads + _threads.length;

      return { isNext, _threads };
    } catch (error: any) {
      const _err = `Failed to find threads ¯\_(ツ)_/¯ : ${error.message}`;
      console.error(_err);
      throw new Error(_err);
    }
  },
  fetchThreadById = async (_threadId: string) => {
    try {
      await ConnectToDB();

      const _threadDetails = await Threads.findById(_threadId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        })
        .populate({
          path: "children",
          populate: [
            {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
            {
              path: "children",
              model: Threads,
              populate: {
                path: "author",
                model: User,
                select: "_id id name parentId image",
              },
            },
          ],
        })
        .exec();

      return _threadDetails;
    } catch (error: any) {
      const _err = `Failed to find thread ¯\_(ツ)_/¯ make sure You's connected! : ${error.message}`;
      console.error(_err);
      throw new Error(_err);
    }
  };

export { createThread, fetchThreads, fetchThreadById };
