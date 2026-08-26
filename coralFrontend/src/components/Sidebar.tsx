import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Image,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Tooltip } from "./ui/tooltip";
import {
  ExploreGPTIcon,
  NewChatIcon,
  UpgradeIcon,
} from "../icons/sidebar-icons";
import coralIcon from "@/assets/a-circular-logo-that-has-a-coral-but-there-is-like.png";
import type { ChatSession } from "../chat/types";

interface SidebarProps {
  readonly isOpen: boolean;
  readonly chats: ChatSession[];
  readonly activeChatId: string;
  readonly onSelectChat: (chatId: string) => void;
  readonly onNewChat: () => void;
  readonly onRenameChat: (chatId: string, title: string) => void;
}

function Sidebar({
  isOpen,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
}: SidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  function startRename(chat: ChatSession) {
    setEditingChatId(chat.id);
    setDraftTitle(chat.title);
  }

  function commitRename() {
    if (!editingChatId) return;

    onRenameChat(editingChatId, draftTitle);
    setEditingChatId(null);
    setDraftTitle("");
  }

  function cancelRename() {
    setEditingChatId(null);
    setDraftTitle("");
  }

  return (
    <Box
      bg="bg.muted"
      w={{ base: isOpen ? "260px" : "0", md: isOpen ? "260px" : "0" }}
      overflow="hidden"
      flexShrink="0"
      transition="width 0.2s ease"
    >
      <Stack h="full" px="3" py="2">
        <Flex justify="space-between">
          <Tooltip
            content="New Chat"
            showArrow
            positioning={{ placement: "right" }}
          >
            <IconButton
              variant="ghost"
              onClick={onNewChat}
              aria-label="New chat"
            >
              <NewChatIcon fontSize="2xl" color="fg.muted" />
            </IconButton>
          </Tooltip>
        </Flex>
        <Stack px="2" gap="0" flex="1">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={chat.id === activeChatId ? "subtle" : "ghost"}
              justifyContent="flex-start"
              px="2"
              h="10"
              borderRadius="lg"
              w="100%"
              onClick={() => {
                if (editingChatId !== chat.id) {
                  onSelectChat(chat.id);
                }
              }}
            >
              <HStack w="100%" minW="0" gap="2">
                <Circle size="6" bg="bg" borderWidth="1px" flexShrink="0">
                  <Image
                    src={coralIcon}
                    alt="CoralTB icon"
                    boxSize="4"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </Circle>
                {editingChatId === chat.id ? (
                  <Input
                    size="xs"
                    value={draftTitle}
                    autoFocus
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        commitRename();
                      }

                      if (event.key === "Escape") {
                        event.preventDefault();
                        cancelRename();
                      }
                    }}
                  />
                ) : (
                  <Text
                    fontSize="sm"
                    textAlign="left"
                    flex="1"
                    truncate
                    onDoubleClick={(event) => {
                      event.stopPropagation();
                      startRename(chat);
                    }}
                  >
                    {chat.title}
                  </Text>
                )}
              </HStack>
            </Button>
          ))}
          <HStack px="2" h="10" borderRadius="lg" w="100%" color="fg.muted">
            <ExploreGPTIcon fontSize="md" />
            <Text fontSize="sm" fontWeight="md">
              Explore CoralTB
            </Text>
          </HStack>
        </Stack>
        <Box
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
        </Box>
      </Stack>
    </Box>
  );
}

export default Sidebar;
