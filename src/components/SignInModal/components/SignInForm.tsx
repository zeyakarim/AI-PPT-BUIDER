import { FormContent } from "./FormContent";

export const SignInForm = ({ onClose }: { onClose: () => void; }) => {
  return (
    <div className="box-border caret-transparent flex flex-col p-4">
      <div className="box-border caret-transparent flex justify-center w-full">
        <FormContent onClose={onClose} />
      </div>
    </div>
  );
};