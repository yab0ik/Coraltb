import { Avatar, Flex, HStack, IconButton } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import MenuComponent from "./coralMenu";
import { SidebarIcon } from "../icons/sidebar-icons";

interface AppHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

function AppHeader({ isSidebarOpen, onToggleSidebar }: AppHeaderProps) {
  return (
    <Flex justify="space-between" align="center" p="2">
      <HStack>
        <Tooltip
          content={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          positioning={{ placement: "right" }}
          showArrow
        >
          <IconButton
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            variant="ghost"
            onClick={onToggleSidebar}
          >
            <SidebarIcon fontSize="2xl" color="fg.muted" />
          </IconButton>
        </Tooltip>
        <MenuComponent />
      </HStack>
      <Avatar.Root size="sm" colorPalette="purple" variant="solid" mr="3">
        <Avatar.Fallback name="K" />
      </Avatar.Root>
    </Flex>
  );
}

export default AppHeader;
