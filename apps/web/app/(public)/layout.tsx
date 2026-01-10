
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>

            <Navbar />
            {children}
            <ScrollToTop />
        </>
    );
}
