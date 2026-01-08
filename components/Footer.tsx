"use client";

import { Dribbble, Instagram, Sms } from "iconsax-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-dark text-white pt-24 pb-12 px-6 md:px-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                {/* Massive CTA */}
                {/* Massive CTA */}
                <div className="mb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1">
                        <h2 className="text-[12vw] lg:text-[10vw] leading-none font-black uppercase tracking-tighter mb-8 text-white group-hover:text-primary transition-colors">
                            Let's <span className="text-primary italic font-serif">Talk</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
                            Have a vision? Let's dismantle the complexity and build something your users will actually understand.
                        </p>
                        <Link
                            href="mailto:rakhacimano@gmail.com"
                            className="bg-primary text-dark px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-bold uppercase tracking-wide hover:bg-white transition-colors inline-block"
                        >
                            Text Me
                        </Link>
                    </div>

                    {/* CTA Image Decoration */}
                    <div className="w-full lg:w-1/3 aspect-square relative grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-tr from-dark to-transparent z-10 opacity-50"></div>
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop"
                            alt="Let's Talk"
                            className="w-full h-full object-cover border-2 border-white/10"
                        />
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary animate-pulse blur-3xl opacity-20"></div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12">
                    <div className="mb-8 md:mb-0">
                        <img src="assets/logo-white.png" alt="Logo Rakha Putra Pratama" />
                        <h3 className="text-2xl font-bold uppercase mt-8 mb-4">Rakha Putra Pratama</h3>
                        <p className="font-mono text-sm opacity-50">
                            &copy; {currentYear}. Senior UI/UX Designer.<br />
                            Indonesia | {(() => {
                                const [time, setTime] = React.useState(new Date());
                                React.useEffect(() => {
                                    const timer = setInterval(() => setTime(new Date()), 1000);
                                    return () => clearInterval(timer);
                                }, []);
                                return new Intl.DateTimeFormat('en-GB', {
                                    timeZone: 'Asia/Jakarta',
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: false
                                }).format(time);
                            })()} WIB
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="#" className="" aria-label="Dribbble">
                            <Dribbble color="white" variant="Bold" size="24" />
                        </Link>
                        <Link href="#" className="" aria-label="Email">
                            <Sms color="white" variant="Bold" size="24" />
                        </Link>
                        <Link href="#" className="" aria-label="Instagram">
                            <Instagram color="white" variant="Bold" size="24" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
