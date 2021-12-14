import React from "react";

const Menu = () => {
  return (
    <div>
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
    </div>
  );
};

export default Menu;
