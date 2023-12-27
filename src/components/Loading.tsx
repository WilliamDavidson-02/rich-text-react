export function LoadingSm() {
  return (
    <div className="border-rich-light-green h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
  );
}

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="border-rich-light-green h-48 w-48 animate-spin rounded-full border-[10px] border-t-transparent md:h-64 md:w-64" />
    </div>
  );
}
