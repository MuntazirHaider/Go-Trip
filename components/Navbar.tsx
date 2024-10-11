import React from 'react'
// clerk
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
// next js
import Image from 'next/image'

const Navbar = () => {
    return (
        <header
            className="inset-x-0 mx-auto w-full max-w-screen-md border border-gray-100 bg-white shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg my-2">
            <div className="px-2 md:px-4">
                {/* logo */}
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <Image src='/assets/logo.png' alt='Logo' width={100} height={50} />
                            <p className="font-medium">
                                <span className="bg-yellow-400 text-black px-1 rounded-md text-2xl">Go</span>
                                <span className="text-yellow-400 px-1 text-lg">Trip</span>
                            </p>
                        </a>
                    </div>
                    {/* user logo */}
                    <div className="flex items-center justify-end gap-3">
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        // Style for the avatar box
                                        userButtonAvatarBox: "w-10 h-10 border-2 border-yellow-500 bg-white", // Adjust width and height for size, border color for theme
                                        // Style for the avatar image inside the box
                                        userButtonAvatarImage: "rounded-full", // Make sure the image remains round
                                    },
                                    variables: {
                                        colorPrimary: '#fbbf24', // Yellow for primary accents
                                        colorBackground: '#ffffff', // White background for matching the theme
                                    },
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
