import { SignInForm } from "./components/SignInForm";

export const SignInModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="relative w-full max-w-lg bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto p-4 md:p-6"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <SignInForm onClose={onClose} />
    </div>
  );
};