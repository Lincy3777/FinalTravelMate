"use client";

import { motion } from "framer-motion";
import React from "react";

const Loader: React.FC = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="h-[70vh] flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="px-4 py-12">
        <div className="rounded relative bg-white py-12">
          <div className="rounded-full bg-indigo-100 w-[177px] h-[177px] relative flex justify-center items-center mx-auto animate-spin">
            <svg
              className="absolute top-0 left-0"
              width={177}
              height={177}
              viewBox="0 0 177 177"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M169.667 88.5C173.717 88.5 177.032 85.2113 176.696 81.1755..."
                fill="#808080"
              />
            </svg>
            <div className="rounded-full bg-white w-[150px] h-[150px]" />
          </div>
          <p className="mt-6 font-medium text-gray-800 text-center animate-bounce text-xl">
            Loading ...
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
