"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";

// FrozenRouter ensures the exiting page retains its context/state during the exit animation
function FrozenRouter(props: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext ?? {});
    const frozen = useRef(context).current;

    if (!frozen) {
        return <>{props.children}</>;
    }

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // smooth cubic-bezier
                className="w-full"
            >
                {/* <FrozenRouter>{children}</FrozenRouter> */}
                {/* Freezing router context is complex in App Router. 
             Simple children passing often works if the layout structure is stable. 
             If issues arise (content disappearing instantly), we might need the FrozenRouter hack 
             or just rely on standard AnimatePresence behavior which usually unmounts.
             For now, standard behavior:
         */}
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
