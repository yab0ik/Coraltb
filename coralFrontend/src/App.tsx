import { Box, Flex, Stack } from "@chakra-ui/react";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Flex minH="100dvh">
      <Sidebar />
      <Box flex="1" minW="0">
        <Stack h="full">
          <AppHeader />
          <LandingPage />
          <AppFooter />
        </Stack>
      </Box>
    </Flex>
  );
}

export default App;
