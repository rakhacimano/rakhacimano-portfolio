import Link from "next/link";
import { ReactNode } from "react";

interface ButtonPrimaryProps {
    href: string;
    children: ReactNode;
    target?: string;
    rel?: string;
    className?: string;
    onClick?: () => void;
}

export default function ButtonPrimary({
    href,
    children,
    target,
    rel,
    className = "",
    onClick
}: ButtonPrimaryProps) {
    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            onClick={onClick}
            className={`bg-primary text-dark px-5 py-2 md:px-6 md:py-3 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors inline-block ${className}`}
        >
            {children}
        </Link>
    );
}
