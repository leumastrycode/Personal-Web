"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function FadeIn({
    children,
    delay = 0,
    direction = "up",
}: {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}) {
    const variants = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...variants[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}