import React from "react";
import { motion } from "framer-motion";
import { Box, Icon, Center } from "@chakra-ui/react";

const SVGVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      staggerChildren: 0.3,
    },
  },
};
const CenterMotion = motion(Center);
const Logo = () => {
  return (
    <motion.svg
      variants={SVGVariant}
      initial="hidden"
      animate="visible"
      version="1.1"
      fill="#114ea5"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="10rem"
      height="10rem"
      viewBox="0 0 91.875 91.875"
      style={{ enableBackground: "new 0 0 91.875 91.875" }}
      xmlSpace="preserve"
    >
      <g>
        <g>
          <motion.path
            initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
            animate={{ opacity: 1, scale: 1, pathLength: 1 }}
            transition={{
              type: "tween",
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            d="M45.937,0C20.566,0,0,20.566,0,45.937c0,25.372,20.566,45.938,45.937,45.938c25.372,0,45.938-20.566,45.938-45.938
			C91.875,20.566,71.309,0,45.937,0z M45.937,83.898c-21.002,0-38.028-17.026-38.028-38.028S24.935,7.842,45.937,7.842
			c21,0,38.028,17.025,38.028,38.028C83.965,66.872,66.938,83.898,45.937,83.898z"
          />

          <motion.polygon
            initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
            animate={{ opacity: 1, scale: 1, pathLength: 1 }}
            transition={{
              delay: 0.3,
              type: "tween",
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            points="45.937,40.613 27.903,22.816 22.427,22.816 22.427,68.906 30.336,68.906 30.334,35.593 45.7,50.805 
			68.973,28.292 68.973,22.816 63.801,22.816 		"
          />
          <motion.polygon
            initial={{ opacity: 0, pathLength: 0, scale: 0.4 }}
            animate={{ opacity: 1, pathLength: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            points="33.302,43.351 33.302,53.618 45.7,66.016 61.193,50.207 61.062,68.906 68.973,68.906 68.973,32.171 45.7,55.368 
					"
          />
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </motion.svg>
  );
};

const IsLoading = () => {
  return (
    <CenterMotion
      initial={{ scale: 0.3 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      when="beforeChildren"
      h="100%"
      bg="brand.50"
    >
      <Icon as={Logo} fill="brand.500" color="brand.500" />
    </CenterMotion>
  );
};

export default IsLoading;
