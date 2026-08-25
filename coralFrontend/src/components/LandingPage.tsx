import {
  Box,
  FileUpload,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { UploadIcon } from "../icons/other-icons";

function LandingPage() {
  return (
    <Flex
      flex="1"
      align="center"
      justify="center"
      w="full"
      px={{ base: "2", sm: "4" }}
    >
      <VStack w="full" gap="4">
        <Heading size={{ base: "xl", sm: "3xl" }} textAlign="center">
          What can I help you with today?
        </Heading>
        <FileUpload.Root maxFiles={5} w={{ base: "full", sm: "70%" }} mx="auto">
          <FileUpload.HiddenInput />
          <InputGroup
            w="full"
            startElementProps={{ pointerEvents: "auto" }}
            startElement={
              <Tooltip content="Upload files" showArrow openDelay={0}>
                <Box display="inline-flex">
                  <FileUpload.Trigger asChild>
                    <IconButton
                      aria-label="Upload files"
                      title="Upload files"
                      variant="ghost"
                      size="sm"
                    >
                      <UploadIcon fontSize="2xl" />
                    </IconButton>
                  </FileUpload.Trigger>
                </Box>
              </Tooltip>
            }
          >
            <Input
              placeholder="Type your message here..."
              size="lg"
              w="full"
              variant="subtle"
              borderRadius="3xl"
            />
          </InputGroup>
          <Box w="full" mt="2">
            <FileUpload.List showSize clearable />
          </Box>
        </FileUpload.Root>
      </VStack>
    </Flex>
  );
}

export default LandingPage;
