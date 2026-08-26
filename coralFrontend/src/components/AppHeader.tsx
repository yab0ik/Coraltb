import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import type { GoogleUser } from "../auth/useGoogleAuth";
import { Tooltip } from "./ui/tooltip";
import MenuComponent from "./coralMenu";
import { SidebarIcon } from "../icons/sidebar-icons";

interface AppHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  user: GoogleUser | null;
  onSignOut: () => void;
}

function AppHeader({
  isSidebarOpen,
  onToggleSidebar,
  user,
  onSignOut,
}: AppHeaderProps) {
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
      {user ? (
        <HStack mr="3" gap="2">
          <Avatar.Root size="sm" colorPalette="purple" variant="solid">
            {user.picture && <Avatar.Image src={user.picture} />}
            <Avatar.Fallback name={user.name} />
          </Avatar.Root>
          <Button size="xs" variant="outline" onClick={onSignOut}>
            Sign out
          </Button>
        </HStack>
      ) : (
        <Box id="google-signin-button" mr="3" minH="40px" />
      )}
    </Flex>
  );
}

export default AppHeader;
