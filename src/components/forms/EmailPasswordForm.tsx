import { useState } from 'react';
import type { FormEvent } from 'react'; 

type EmailPasswordFormProps = {
    onClose: () => void;
};

export const EmailPasswordForm = ({ onClose }: EmailPasswordFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const isValidEmail = email.includes('@') && email.includes('.');
        setEmailError(!isValidEmail);

        if (isValidEmail && password.length > 0) {
            console.log('Attempting sign-in with:', { email, password });
            setTimeout(() => {
                console.log('Sign-in successful (simulated)!');
                onClose(); 
            }, 500);
        } else {
            console.log('Validation failed.');
        }
    };

    return (
        <form className="box-border caret-transparent" onSubmit={handleSubmit}> {/* 👈 Add onSubmit */}
            <div className="box-border caret-transparent">
                <div className="box-border caret-transparent mt-2">
                    <input
                        placeholder="musk@spacex.com"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(false);
                        }}
                        name="email"
                        className={`text-sm box-border caret-transparent flex h-10 leading-5 w-full border px-3 py-2 rounded-md border-solid ${emailError ? 'border-red-500' : 'border-gray-200' // 👈 Conditional border
                            }`}
                    />
                    {emailError && (
                        <p className="text-red-600 text-xs box-border caret-transparent leading-4 mt-1">
                            Please enter a valid email address.
                        </p>
                    )}
                </div>
            </div>
            <div className="box-border caret-transparent mt-6">
                <div className="relative box-border caret-transparent mt-2 mb-4">
                    <input
                        placeholder="********"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        className="text-sm box-border caret-transparent flex h-10 leading-5 w-full border border-gray-200 pl-3 pr-10 py-2 rounded-md border-solid"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Show password"
                        className="absolute text-gray-400 bg-transparent caret-transparent block text-center translate-y-[-50.0%] p-0 right-2 top-2/4 hover:text-gray-700"
                    >
                        <img
                            src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-19.svg"
                            alt="Icon"
                            className="box-border caret-transparent h-5 w-5"
                        />
                    </button>
                </div>
                <a
                    href="/forgot-password"
                    className="text-gray-900 text-sm font-medium bg-white box-border caret-transparent leading-5 underline"
                >
                    Forgot Password?
                </a>
            </div>
            <div className="box-border caret-transparent mt-6">
                <button
                    type="submit"
                    disabled={!email || !password || emailError} // 👈 Disable if fields are invalid/empty
                    className={`text-white text-sm font-medium items-center bg-gray-800 caret-transparent flex h-10 justify-center leading-5 text-center text-nowrap w-full px-4 py-2 rounded-md ${(!email || !password || emailError) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900' // 👈 Conditional styles
                        }`}
                >
                    Sign in with Password
                </button>
            </div>
        </form>
    );
};