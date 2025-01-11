"use client";

import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { FaShieldHalved, FaUserSecret } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaMicroscope } from "react-icons/fa";

const iconMap = {
  FaShieldHalved,
  IoSearch,
  FaMicroscope,
  FaUserSecret,
};

const OurServices = ({ ourServicesData }) => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="our-services"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-63px)] select-none bg-gradient-to-b from-primary-clr to-gray-950 p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("down", "spring", 0.2, 0.5)}
        className="flex-center"
      >
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {ourServicesData?.heading}
        </h2>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {ourServicesData?.services?.map((service, index) => {
          const directions = ["right", "down", "up", "left"];
          const Icon = iconMap[service.icon];

          return (
            <motion.div
              key={index}
              variants={fadeInOut(directions[index % 4], "spring", 0.3, 0.5)}
              className="w-full h-full bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
            >
              <div className="space-y-4 lg:space-y-6">
                {Icon && <Icon size={35} className="fill-blue-500" />}
                <h4 className="text-white text-md md:text-lg lg:text-xl font-extrabold">
                  {service.head}
                </h4>
                <p className="text-sky-500 text-balance text-xs md:text-sm lg:text-md">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default OurServices;
