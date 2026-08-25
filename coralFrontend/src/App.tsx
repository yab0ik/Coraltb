import { Box, Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Flex minH="100dvh">
      <Sidebar isOpen={isSidebarOpen} />
      <Box flex="1" minW="0">
        <Stack h="full">
          <AppHeader
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
          />
          <LandingPage />
          <AppFooter />
        </Stack>
      </Box>
    </Flex>
  );
}

export default App;
