import Icon from "@chakra-ui/icon";
import { HStack, Text } from "@chakra-ui/layout";
import React from "react";
import { ReactComponent as Logo } from "./logo.svg";

const FulLogo = ({ w, h, fs, color, fill, spacing, showText, ...rest }) => {
  return (
    <HStack {...rest} spacing={spacing ? spacing : "2"}>
      <Icon as={Logo} w={w} h={h} fill={fill} />
      <Text
        fontSize={fs ? fs : "xl"}
        color={color ? color : "white"}
        fontWeight="semibold"
      >
        {showText ? "" : "moneydais"}
      </Text>
    </HStack>
  );
};

export default FulLogo;
