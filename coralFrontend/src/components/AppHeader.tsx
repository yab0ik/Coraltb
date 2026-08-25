import { Avatar, Flex } from "@chakra-ui/react";
import MenuComponent from "./coralMenu";

function AppHeader() {
  return (
    <Flex justify="space-between" align="center" p="2">
      <MenuComponent />
      <Avatar.Root size="sm" colorPalette="purple" variant="solid" mr="3">
        <Avatar.Fallback name="K" />
      </Avatar.Root>
    </Flex>
  );
}

export default AppHeader;
