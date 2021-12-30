import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const useMotionComponent = () => {
  const CenterMotion = motion(Center);
  const HeadingMotion = motion(Heading);
  const VStackMotion = motion(VStack);
  const TextMotion = motion(Text);
  return { HeadingMotion, VStackMotion, TextMotion, CenterMotion };
};

export default useMotionComponent;
