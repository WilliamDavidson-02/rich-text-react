type SubmitBtnGreenProps = {
  text: string;
};

export default function SubmitBtnGreen({ text }: SubmitBtnGreenProps) {
  return (
    <button
      type="submit"
      role="button"
      className="bg-rich-dark-green text-rich-light-green focus:border-rich-light-green hover:border-rich-light-green border-rich-dark-green rounded-md border p-2 outline-none transition duration-200 ease-in"
    >
      {text}
    </button>
  );
}
