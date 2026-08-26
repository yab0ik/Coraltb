import { useMemo, useRef, useState } from "react";
import type { ChatSession } from "./types";

function createChatSession(index: number): ChatSession {
  return {
    id: `chat-${Date.now()}-${index}`,
    title: `New Chat ${index}`,
    messages: [],
    files: [],
    isProjectStarted: false,
    updatedAt: Date.now(),
  };
}

export function useChatSessions() {
  const chatCountRef = useRef(2);
  const initialChat = useMemo(() => createChatSession(1), []);
  const [chats, setChats] = useState<ChatSession[]>([initialChat]);
  const [activeChatId, setActiveChatId] = useState(initialChat.id);

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) ?? chats[0] ?? initialChat;

  function createNewChat() {
    const nextChat = createChatSession(chatCountRef.current);
    chatCountRef.current += 1;

    setChats((currentChats) => [nextChat, ...currentChats]);
    setActiveChatId(nextChat.id);
  }

  function updateActiveChat(updater: (chat: ChatSession) => ChatSession) {
    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === activeChatId ? updater(chat) : chat,
      ),
    );
  }

  function renameChat(chatId: string, title: string) {
    const nextTitle = title.trim() || "Untitled chat";

    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, title: nextTitle, updatedAt: Date.now() }
          : chat,
      ),
    );
  }

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createNewChat,
    updateActiveChat,
    renameChat,
  };
}
