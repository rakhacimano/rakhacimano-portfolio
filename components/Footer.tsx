"use client";

import Link from "next/link";
import { ArrowRight } from "iconsax-react";

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
                        <p className="text-xl md:text-2xl text-gray-400 max-w-xl font-medium mb-10 leading-relaxed">
                            Have a vision? Let's dismantle the complexity and build something your users will actually understand.
                        </p>
                        <Link
                            href="mailto:hello@rakha.design"
                            className="bg-primary text-dark px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-bold uppercase tracking-wide hover:bg-white transition-colors inline-block"
                        >
                            Let's Talk
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
                        <h3 className="text-2xl font-bold uppercase mb-4">Rakha Putra Pratama</h3>
                        <p className="font-mono text-sm opacity-50">
                            &copy; {currentYear}. Senior UI/UX Designer.<br />
                            Jakarta, Indonesia.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors" aria-label="Dribbble">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-5.38c-3.72-3.85-8.62-5.46-12.26-2.58m5.17-10.87c.28 2.81-2.07 7.06-8.23 6.8"></path>
                            </svg>
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
