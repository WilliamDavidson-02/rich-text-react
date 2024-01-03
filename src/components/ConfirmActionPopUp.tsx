import GreenGlowContainer from "./GreenGlowContainer";
import RedBtnContainer from "./RedBtnContainer";
import SubmitBtnGreen from "./SubmitBtnGreen";

type ConfirmActionPopUpProps = {
  message: string;
  cancelAction: () => void;
  confirmAction: () => void;
};

export default function ConfirmActionPopUp({
  message,
  cancelAction,
  confirmAction,
}: ConfirmActionPopUpProps) {
  return (
    <div
      onClick={cancelAction}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen cursor-pointer items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div onClick={(ev) => ev.stopPropagation()} className="max-w-[500px]">
        <GreenGlowContainer>
          <div className="flex cursor-default flex-col gap-4 p-4">
            <h4 className="text-center text-lg">{message}</h4>
            <div className="grid grid-cols-2 gap-4">
              <RedBtnContainer onClick={cancelAction}>Cancel</RedBtnContainer>
              <SubmitBtnGreen
                isActive={false}
                isDisabled={false}
                onClick={confirmAction}
              >
                Confirm
              </SubmitBtnGreen>
            </div>
          </div>
        </GreenGlowContainer>
      </div>
    </div>
  );
}
