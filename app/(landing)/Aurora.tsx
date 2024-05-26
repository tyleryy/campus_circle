"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/Aurora-Background";
import AuthButton from "@/components/AuthButton";
import { ReactTyped } from "react-typed";
import AnimatedText from "../AnimatedText";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-neutral-200 text-center">
          Welcome to <i className="text-blue-400">CampusCircle.</i>
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Network with{" "}
          <ReactTyped
            className="text-blue-400"
            strings={["Clubs.", "Students.", "Others."]}
            typeSpeed={100}
            loop
            backSpeed={100}
          ></ReactTyped>
        </div>
        <AuthButton />
      </motion.div>
    </AuroraBackground>
  );
}
