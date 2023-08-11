"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { CommentValidation } from "@/src/lib/validations/thread";
import { Input } from "../ui/input";
import Image from "next/image";
import { AddCommentToThread } from "@/src/lib/actions/threads.actions";
import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  currentUserImg: string | undefined;
  currentUserId: string;
}
const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  // const _router = useRouter(),
  const _pathname = usePathname(),
    //     { organization } = useOrganization(),

    form = useForm<z.infer<typeof CommentValidation>>({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: "",
      },
    }),
    onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await AddCommentToThread(
        threadId,
        values.thread,
        currentUserId,
        _pathname,
      );
      form.reset();
    };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg || ""}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
