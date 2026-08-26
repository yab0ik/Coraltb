import { Box, Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useGoogleAuth } from "./auth/useGoogleAuth";
import { useChatSessions } from "./chat/useChatSessions";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createNewChat,
    updateActiveChat,
    renameChat,
  } = useChatSessions();
  const { user, signOut } = useGoogleAuth();

  return (
    <Flex minH="100dvh">
      <Sidebar
        isOpen={isSidebarOpen}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={createNewChat}
        onRenameChat={renameChat}
      />
      <Box flex="1" minW="0">
        <Stack h="full">
          <AppHeader
            isSidebarOpen={isSidebarOpen}
            user={user}
            onSignOut={signOut}
            onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
          />
          <LandingPage
            key={activeChat.id}
            chat={activeChat}
            onUpdateChat={updateActiveChat}
          />
          <AppFooter />
        </Stack>
      </Box>
    </Flex>
  );
}

export default App;
