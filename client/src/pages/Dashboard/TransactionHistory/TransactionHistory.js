import { Button } from "@chakra-ui/button";
import { Box, HStack, Spacer, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import randomatic from "randomatic";
import React from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import useTransactionHistory from "../../../hooks/useTransactionHistory";
const TransactionHistory = () => {
  const {
    daysSelection,
    storeUserSelection,
    setStoreUseSelection,
    transactions,
  } = useTransactionHistory();

  return (
    <Box px="5" mt="10">
      <HStack>
        <Box>
          <Text fontSize="sm" color="brand.800" fontWeight="bold">
            Last Transactions
          </Text>
        </Box>
        <Spacer />
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                variant="ghost"
                isActive={isOpen}
                rightIcon={isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                fontWeight="normal"
                borderRadius="2px"
                _focus={{
                  boxShadow: "sm",
                  border: "1px",
                  borderColor: "brand.400",
                }}
                size="sm"
              >
                {storeUserSelection}
              </MenuButton>
              <MenuList>
                {daysSelection.map((item) => (
                  <MenuItem
                    key={`${item}`}
                    onClick={() => setStoreUseSelection(item)}
                  >
                    {item}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </HStack>

      {Array.from(transactions).map(({ amount, narration, status }) => (
        <React.Fragment key={randomatic("0a", 12)}>
          <Text>{amount}</Text>
          <Text>{narration}</Text>
          <Text>{status}</Text>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TransactionHistory;
