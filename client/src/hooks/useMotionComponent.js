import { Center,Button, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const useMotionComponent = () => {
  const BoxMotion = motion(Box);
  const ButtonMotion = motion(Button);
  const HeadingMotion = motion(Heading);
  const VStackMotion = motion(VStack);
  const TextMotion = motion(Text);
  const CenterMotion = motion(Center);
  return {
    HeadingMotion,
    VStackMotion,
    TextMotion,
    CenterMotion,
    BoxMotion,
    ButtonMotion,
  };
};

export default useMotionComponent;
