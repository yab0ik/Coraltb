import {
  Avatar,
  Box,
  Center,
  Circle,
  FileUpload,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Tooltip } from "./components/ui/tooltip";
import {
  ExploreGPTIcon,
  NewChatIcon,
  SidebarIcon,
  SmallGPTIcon,
  UpgradeIcon,
} from "./icons/sidebar-icons";
import MenuComponent from "./components/coralMenu";
import { UploadIcon } from "./icons/other-icons";

function App() {
  return (
    <Flex minH="100dvh">
      <Box bg="bg.muted" w="260px" display={{ base: "none", md: "block" }}>
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
      <Box flex="1" minW="0">
        <Stack h="full">
          <Flex justify="space-between" align="center" p="2">
            <MenuComponent />
            <Avatar.Root size="sm" colorPalette="purple" variant="solid" mr="3">
              <Avatar.Fallback name="K" />
            </Avatar.Root>
          </Flex>
          <Center flex="1" w="full" px={{ base: "2", sm: "4" }}>
            <VStack w="full" gap="4">
              <Heading size={{ base: "xl", sm: "3xl" }} textAlign="center">
                What can I help you with today?
              </Heading>
              <Center w="full">
                <InputGroup
                  w="full"
                  startElement={
                    <FileUpload.Root maxFiles={5}>
                      <FileUpload.HiddenInput />
                      <FileUpload.Trigger asChild>
                        <IconButton
                          aria-label="Upload files"
                          variant="ghost"
                          size="sm"
                        >
                          <UploadIcon fontSize="2xl" />
                        </IconButton>
                      </FileUpload.Trigger>
                      <FileUpload.List showSize clearable />
                    </FileUpload.Root>
                  }
                >
                  <Input
                    placeholder="Type your message here..."
                    size="lg"
                    w="100%"
                    variant="subtle"
                    borderRadius="3xl"
                  />
                </InputGroup>
              </Center>
            </VStack>
          </Center>
          <Box pb="2">Bottom</Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default App;
