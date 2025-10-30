import { EmailPasswordForm } from "../../forms/EmailPasswordForm";
import { SocialSignIn } from "../../forms/SocialSignIn";

export const FormContent = ({ onClose }: { onClose: () => void; }) => {
  return (
    <div className="box-border caret-transparent max-w-sm w-full mx-auto md:w-96">
      <div className="box-border caret-transparent mt-6">
        <div className="box-border caret-transparent">
          <h1 className="text-2xl font-semibold box-border caret-transparent tracking-[-0.6px] leading-8">
            Sign in to MagicSlides
          </h1>
          <p className="text-gray-600 text-sm box-border caret-transparent leading-5 mt-4">
            Access your account securely with email verification.
          </p>
        </div>
        <div className="box-border caret-transparent mt-6">
          <div className="box-border caret-transparent flex basis-[0%] flex-col grow justify-center min-h-full z-10">
            <div className="box-border caret-transparent max-w-md w-full mx-auto px-4 md:px-0">
              <div className="bg-white box-border caret-transparent px-6 md:px-2">
                <EmailPasswordForm onClose={onClose} />
                <SocialSignIn onClose={onClose} />
                <p className="text-gray-600 text-sm box-border caret-transparent leading-5 text-center mt-6">
                  Don&#39;t have an account?
                  <a
                    href="/signup"
                    className="text-black font-semibold box-border caret-transparent ml-1 hover:text-gray-800"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-xs box-border caret-transparent leading-4 text-center mt-6">
          By continuing, you agree to our
          <a
            href="/terms-of-use"
            className="box-border caret-transparent underline"
          >
            Terms of Service
          </a>
          and
          <a
            href="/privacy-policy"
            className="box-border caret-transparent underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};