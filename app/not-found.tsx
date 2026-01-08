"use client";

import ButtonPrimary from "@/components/ButtonPrimary";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="h-screen w-full flex items-center bg-background text-dark px-6 md:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Text Content (Left) */}
                <div className="flex flex-col items-start order-2 md:order-1">
                    <h1 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-6 text-primary">
                        Oops!
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-light mb-12 max-w-lg">
                        We looked everywhere, but we couldn't find the page you were looking for. It might have been moved or deleted.
                    </p>

                    <ButtonPrimary href="/">
                        Back to Home
                    </ButtonPrimary>

                </div>

                {/* Image (Right) */}
                <div className="relative w-full h-64 md:h-[500px] order-1 md:order-2 flex justify-center items-center">
                    <Image
                        src="/assets/not-found.png"
                        alt="404 Illustration"
                        width={600}
                        height={600}
                        className="object-contain drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </div>
            </div>
        </div>
    );
}
