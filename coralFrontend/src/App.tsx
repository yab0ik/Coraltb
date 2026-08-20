import { Box, Center, Flex, IconButton, Stack} from "@chakra-ui/react";
import { Tooltip } from "./components/ui/tooltip";
import { NewChatIcon, SidebarIcon } from "./icons/sidebar-icons";


function App() {
  return (
    <Flex minH="100dvh">
      <Box bg="bg.muted" w="260px">
        <Stack h ="full" px="3" py="2">
          <Flex justify="space-between" >
            <Tooltip
              content="Sidebar"
              positioning={{ placement: "right" }}
              showArrow
            >
              <IconButton variant="ghost">
                <SidebarIcon fontSize="2xl" color="fg.muted" />
              </IconButton>
            </Tooltip>
            <Tooltip
              content="New Chat"
              showArrow
            >
              <IconButton variant="ghost">
                <NewChatIcon fontSize="2xl" color="fg.muted" />
              </IconButton>
            </Tooltip>
          </Flex>
        </Stack>
      </Box>
      <Box>
        <Stack h="full">
          <Box>Top</Box>
          <Center flex="1">Middle</Center>
          <Box pb="2">Bottom</Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default App;