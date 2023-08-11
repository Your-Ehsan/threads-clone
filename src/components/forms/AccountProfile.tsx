"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { profile } from "@/public/assets";
import { ChangeEvent, useState } from "react";
import { UserValidation } from "@/src/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import * as z from "zod";
import { isBase64Image } from "@/src/lib/utils";
import { useUploadThing } from "@/src/lib/uploadthing";
import { UpdateUser } from "@/src/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  btnTitle: string;
  user:
    | {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
      }
    | any;
}

const AccountProfile = ({ btnTitle, user }: Props) => {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.

  const [Files, setFiles] = useState<File[]>([]),
    { startUpload } = useUploadThing("media"),
    _pathname = usePathname(),
    _router = useRouter();

  // 1. Define your form.
  const _form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      bio: user?.bio || "",
      username: user?.username || "",
      name: user?.name || "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo,
      IsImgBlobChange = isBase64Image(blob);

    if (IsImgBlobChange) {
      const _ImgRes = await startUpload(Files);

      if (_ImgRes && _ImgRes[0].fileUrl) {
        values.profile_photo = _ImgRes[0].fileUrl;
      }
    }

    await UpdateUser({
      userId: user?.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: _pathname,
    }).then(() =>
      _pathname === "/profile/edit" ? _router.back() : _router.push("/"),
    );
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();
    const _fileReader = new FileReader();

    if (e.target.files && e.target.files?.length > 0) {
      const _file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!_file.type.includes("image")) {
        return null;
      }

      _fileReader.onload = ({ target }) => {
        const _ImageURL = target?.result?.toString() || "";
        fieldChange(_ImageURL);
      };

      _fileReader.readAsDataURL(_file);
    }
  };

  return (
    <Form {..._form}>
      <form
        onSubmit={_form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={_form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    alt="profile_photo"
                    src={field.value}
                    width={96}
                    height={96}
                    priority
                    className=" object-contain rounded-full"
                  />
                ) : (
                  <Image
                    alt="profile_photo"
                    src={profile}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload profile "
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={_form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="text"
                  placeholder="name"
                  {...field}
                  className="account-form_input no-focus"
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={_form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="text"
                  placeholder="name"
                  {...field}
                  className="account-form_input no-focus"
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={_form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Tell About Yourself
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
