'use client';

import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { FaUser, FaArrowRight } from 'react-icons/fa';

interface AuthSectionProps {
    isMobile?: boolean;
}

export default function AuthSection({ isMobile = false }: AuthSectionProps) {

    if (isMobile) {
        return (
            <div className="space-y-2">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#511076] transition-colors duration-200 flex items-center gap-2">
                            <FaUser className="w-4 h-4" />
                            Sign In
                        </button>
                    </SignInButton>
                    
                    <SignUpButton mode="modal">
                        <button className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#511076] transition-colors duration-200 flex items-center gap-2">
                            <FaArrowRight className="w-4 h-4" />
                            Create Account
                        </button>
                    </SignUpButton>
                </SignedOut>
                
                <SignedIn>
                    <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-base font-medium text-gray-700">Account</span>
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8"
                                }
                            }}
                        />
                    </div>
                </SignedIn>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <SignedOut>
                <div className="flex items-center gap-2">
                    <SignInButton mode="modal">
                        <button className="text-gray-700 hover:text-[#511076] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2">
                            <FaUser className="w-4 h-4" />
                            Sign In
                        </button>
                    </SignInButton>
                    
                    <SignUpButton mode="modal">
                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
                            Get Started
                            <FaArrowRight className="w-3 h-3" />
                        </button>
                    </SignUpButton>
                </div>
            </SignedOut>
            
            <SignedIn>
                <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: "w-8 h-8",
                            userButtonPopoverCard: "shadow-xl border border-gray-200",
                            userButtonPopoverActions: "p-2",
                            userButtonPopoverActionButton: "hover:bg-gray-50 rounded-lg transition-colors"
                        }
                    }}
                />
            </SignedIn>
        </div>
    );
}
