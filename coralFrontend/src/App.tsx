import { Box, Center, Circle, Flex, HStack, IconButton, Link, Stack, Text} from "@chakra-ui/react";
import { Tooltip } from "./components/ui/tooltip";
import { ExploreGPTIcon, NewChatIcon, SidebarIcon, SmallGPTIcon, UpgradeIcon } from "./icons/sidebar-icons";


function App() {
  return (
    <Flex minH="100dvh">
      <Box bg="bg.muted" w="260px">
        <Stack h="full" px="3" py="2">
          <Flex justify="space-between">
            <Tooltip
              content="Sidebar"
              positioning={{ placement: "right" }}
              showArrow
            >
              <IconButton variant="ghost">
                <SidebarIcon fontSize="2xl" color="fg.muted" />
              </IconButton>
            </Tooltip>
            <Tooltip content="New Chat" showArrow>
              <IconButton variant="ghost">
                <NewChatIcon fontSize="2xl" color="fg.muted" />
              </IconButton>
            </Tooltip>
          </Flex>
          <Stack px="2" gap="0" flex="1">
            <HStack
              _hover={{ layerStyle: "fill.muted", textDecoration: "none" }}
              px="1"
              h="10"
              borderRadius="lg"
              w="100%"
            >
              <Link
                href="#"
                variant="plain"
                _hover={{ textDecoration: "none" }}
              >
                <Circle size="6" bg="bg" borderWidth="1px">
                  <SmallGPTIcon fontSize="md" />
                </Circle>
                <Text fontSize="sm">CoralTB</Text>
              </Link>
            </HStack>

            <HStack
              _hover={{ layerStyle: "fill.muted", textDecoration: "none" }}
              px="1"
              h="10"
              borderRadius="lg"
              w="100%"
            >
              <Link
                href="#"
                variant="plain"
                _hover={{ textDecoration: "none" }}
              >
                <ExploreGPTIcon fontSize="md" />
                <Text fontSize="sm" fontWeight="md">
                  Explore CoralTB
                </Text>
              </Link>
            </HStack>
          </Stack>
          <Link
            href="#"
            _hover={{
              textDecoration: "none",
              layerStyle: "fill.muted",
              borderRadius: "lg",
            }}
            px="1"
            py="2"
          >
            <HStack>
              <Circle size="8" fontSize="lg" borderWidth="1px">
                <UpgradeIcon />
              </Circle>
              <Stack gap="0" align="start" fontWeight="medium">
                <Text fontSize="sm" fontWeight="md">
                  Upgrade plan
                </Text>
                <Text fontSize="xs" color="fg.subtle">
                  Access to all plans
                </Text>
              </Stack>
            </HStack>
          </Link>
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