type AvatarProps = {
  url: string;
};

export default function Avatar({ url }: AvatarProps) {
  return (
    <img
      className="h-full rounded-full object-cover object-center drop-shadow"
      src={url !== "" ? url : "/rich-text-logo.jpg"}
      alt="avatar"
    />
  );
}
