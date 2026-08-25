import {
  Box,
  Button,
  FileUpload,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { type SubmitEvent, useState } from "react";
import { Tooltip } from "./ui/tooltip";
import { EnterIcon, UploadIcon } from "../icons/other-icons";

interface ChatMessage {
  readonly id: number;
  readonly role: "user" | "assistant";
  readonly content: string;
}

function LandingPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isProjectStarted, setIsProjectStarted] = useState(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = message.trim();

    if (!content) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: "user", content },
      {
        id: Date.now() + 1,
        role: "assistant",
        content: `I received your message: "${content}"`,
      },
    ]);
    setMessage("");
  }

  function handleStartAnalysis() {
    setIsProjectStarted(true);
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: `I found ${files.length} project file${files.length === 1 ? "" : "s"}. I am ready to help you understand the design and plan its verification.`,
      },
    ]);
  }

  const composer = (
    <Box w="full" mx="auto">
      <form onSubmit={handleSubmit}>
          <FileUpload.Root
            maxFiles={5}
            w="full"
            onFileAccept={(details) => setFiles(details.files)}
          >
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
            endElement={
              <Tooltip content="Send message" showArrow openDelay={0}>
                <IconButton
                  type="submit"
                  aria-label="Send message"
                  title="Send message"
                  variant="solid"
                  size="sm"
                >
                  <EnterIcon fontSize="lg" />
                </IconButton>
              </Tooltip>
            }
          >
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
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
      </form>
    </Box>
  );

  return (
    <Flex
      flex="1"
      direction="column"
      w="full"
      px={{ base: "2", sm: "4" }}
      py="4"
    >
      <Box
        flex="1"
        w="full"
        overflowY="auto"
        display="flex"
        alignItems={messages.length === 0 ? "center" : "flex-start"}
        justifyContent="center"
        pb={messages.length > 0 ? "6" : "0"}
      >
        {messages.length === 0 ? (
          <VStack w={{ base: "full", sm: "70%" }} gap="4">
            <VStack gap="1">
              <Heading size={{ base: "xl", sm: "3xl" }} textAlign="center">
                What can I help you with today?
              </Heading>
              <Text color="fg.muted" textAlign="center">
                Upload your RTL, specifications, or existing testbench to begin.
              </Text>
            </VStack>
            {composer}
            {files.length > 0 && (
              <Button
                type="button"
                colorPalette="purple"
                onClick={handleStartAnalysis}
              >
                Start project analysis
              </Button>
            )}
          </VStack>
        ) : (
          <VStack w={{ base: "full", sm: "70%" }} gap="4" align="stretch">
            {isProjectStarted && (
              <Box borderBottomWidth="1px" pb="3">
                <Text fontSize="sm" fontWeight="bold">
                  Verification workspace
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {files.length} project file{files.length === 1 ? "" : "s"} ready for analysis
                </Text>
              </Box>
            )}
            {messages.map((chatMessage) => (
              <Box
                key={chatMessage.id}
                alignSelf={
                  chatMessage.role === "user" ? "flex-end" : "flex-start"
                }
                maxW={{ base: "90%", sm: "75%" }}
                px="4"
                py="3"
                borderRadius="xl"
                bg={
                  chatMessage.role === "user"
                    ? "colorPalette.subtle"
                    : "bg.muted"
                }
              >
                <Text>{chatMessage.content}</Text>
              </Box>
            ))}
            {isProjectStarted && (
              <VStack align="stretch" gap="2" pt="2">
                <Text fontSize="sm" fontWeight="bold">
                  Recommended next steps
                </Text>
                <HStack flexWrap="wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setMessages((currentMessages) => [
                        ...currentMessages,
                        {
                          id: Date.now(),
                          role: "assistant",
                          content: "I will inspect the RTL modules, interfaces, clocks, and resets next.",
                        },
                      ])
                    }
                  >
                    Analyze RTL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setMessages((currentMessages) => [
                        ...currentMessages,
                        {
                          id: Date.now(),
                          role: "assistant",
                          content: "I will turn the project requirements into a verification plan next.",
                        },
                      ])
                    }
                  >
                    Create verification plan
                  </Button>
                </HStack>
              </VStack>
            )}
          </VStack>
        )}
      </Box>
      {messages.length > 0 && composer}
    </Flex>
  );
}

export default LandingPage;
