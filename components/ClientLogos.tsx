"use client";

import Image from "next/image";

const clients = [
    { name: "Pemprov Jatim", logo: "/assets/clients/pemprov-jatim.png" },
    { name: "PT Golektruk Dot Com", logo: "/assets/clients/golektruk.png" },
    { name: "PT Kasir Pintar Internasional", logo: "/assets/clients/kasir-pintar.png" },
    { name: "Kaspin Heroes", logo: "/assets/clients/kaspin-heroes.png" },
    { name: "Artomia", logo: "/assets/clients/artomia.png" },
    { name: "Bindawood Tour Travel", logo: "/assets/clients/bindawood.png" },
    { name: "Forlux", logo: "/assets/clients/forlux-catur-mukti.png" },
    { name: "PT Petrokimia Gresik", logo: "/assets/clients/petrokimia-gresik.png" },
];

export default function ClientLogos() {
    return (
        <section className="w-full bg-white py-16 md:py-24 border-b border-gray-100">
            <div className="container mx-auto px-6 mb-12 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    Trusted By Industry Leaders
                </p>
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center">
                    {clients.map((client, index) => (
                        <div
                            key={`${client.name}-${index}`}
                            className="group/item relative flex flex-col items-center justify-center p-4"
                        >
                            {/* Logo */}
                            <div className="relative w-32 h-16 md:w-40 md:h-20 grayscale transition-all duration-300 group-hover/item:grayscale-0 opacity-60 group-hover/item:opacity-100 group-hover/item:scale-110">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                <div className="bg-dark text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm whitespace-nowrap shadow-xl">
                                    {client.name}
                                    {/* Tiny Arrow */}
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark rotate-45"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
