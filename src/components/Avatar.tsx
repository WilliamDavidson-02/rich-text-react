import { z } from "zod";

type AvatarProps = {
  url: string;
};

const urlSchema = z.string().url();

export default function Avatar({ url }: AvatarProps) {
  const isUrlValid = () => {
    if (url !== "") {
      return urlSchema.safeParse(url).success;
    }
    return false;
  };

  return (
    <img
      className="h-full rounded-md object-cover object-center drop-shadow"
      src={isUrlValid() ? url : "/rich-text-logo.jpg"}
      alt="avatar"
    />
  );
}
