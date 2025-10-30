export const SocialSignIn = ({ onClose }: { onClose: () => void; }) => {
    const handleSocialSignIn = (provider: string) => {
        console.log(`Starting sign-in with ${provider}...`);
        setTimeout(() => {
            console.log(`Sign-in with ${provider} successful (simulated)!`);
            onClose();
        }, 800);
    };

    return (
        <div className="box-border caret-transparent">
            <div className="box-border caret-transparent">
                <div className="items-center box-border caret-transparent flex justify-center w-full">
                    <button
                        onClick={() => handleSocialSignIn('Google')}
                        className="text-white text-sm font-medium items-center bg-orange-700 caret-transparent flex h-10 justify-center leading-5 text-center text-nowrap w-full mt-3 px-4 py-2 rounded-md hover:bg-gray-900"
                    >
                        <img
                            src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-20.svg"
                            alt="Icon"
                            className="box-border caret-transparent h-4 text-nowrap w-4 mr-2"
                        />
                        <span className="font-semibold box-border caret-transparent block leading-6 text-nowrap">
                            Sign in with Google
                        </span>
                    </button>
                </div>
                <div className="relative box-border caret-transparent my-3">
                    <div className="absolute items-center box-border caret-transparent flex inset-0">
                        <div className="box-border caret-transparent w-full border-gray-200 border-t border-solid"></div>
                    </div>
                    <div className="relative text-sm font-medium box-border caret-transparent flex justify-center">
                        <span className="text-gray-900 bg-white box-border caret-transparent block px-6">
                            Or
                        </span>
                    </div>
                </div>
                <div className="items-center box-border caret-transparent flex justify-center w-full mb-3">
                    <button
                        onClick={() => handleSocialSignIn('Email OTP')}
                        type="button"
                        className="text-gray-900 text-sm font-medium items-center bg-white caret-transparent flex h-10 justify-center leading-5 text-center text-nowrap w-full border border-gray-300 px-4 py-2 rounded-md border-solid hover:text-slate-900 hover:bg-slate-100"
                    >
                        <span className="font-semibold box-border caret-transparent block leading-6 text-nowrap">
                            Continue with Email OTP
                        </span>
                    </button>
                </div>
                <div className="items-center box-border caret-transparent flex justify-center w-full">
                    <button
                        onClick={() => handleSocialSignIn('Phone Number')}
                        type="button"
                        className="text-gray-900 text-sm font-medium items-center bg-white caret-transparent flex h-10 justify-center leading-5 text-center text-nowrap w-full border border-gray-300 px-4 py-2 rounded-md border-solid hover:text-slate-900 hover:bg-slate-100"
                    >
                        <span className="font-semibold box-border caret-transparent block leading-6 text-nowrap">
                            Continue with Phone Number
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};