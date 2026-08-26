import coralIcon from "@/assets/a-circular-logo-that-has-a-coral-but-there-is-like.png";
import { MenuIcon } from "@/icons/other-icons";
import {
  Box,
  Button,
  Circle,
  HStack,
  Image,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";

interface MenuItemDetailProps {
  icon: React.ReactElement;
  title: string;
  description?: string;
  element: React.ReactElement;
}
function MenuItemDetail(props: MenuItemDetailProps) {
  const { icon, title, description, element } = props;
  return (
    <HStack w="100%">
      <Circle size="8" bg="bg.subtle">
        {icon}
      </Circle>
      <Stack gap="0" flex="1" align="start">
        <Text>{title}</Text>
        <Text fontSize="xs" color="fg.muted">
          {description}
        </Text>
      </Stack>
      <Box>{element}</Box>
    </HStack>
  );
}
const MenuComponent = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          fontSize="lg"
          fontWeight="bold"
          color="fg.muted"
        >
          <Image
            src={coralIcon}
            alt="CoralTB icon"
            boxSize="7"
            borderRadius="full"
            objectFit="cover"
            mr="2"
          />
          CoralTB <MenuIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="320px" borderRadius="2xl">
            <Menu.Item value="CoralTB plus" py="2">
              <MenuItemDetail
                icon={
                  <Image
                    src={coralIcon}
                    alt="CoralTB icon"
                    boxSize="4"
                    borderRadius="full"
                    objectFit="cover"
                  />
                }
                title="CoralTB plus"
                description="Better models for your needs"
                element={
                  <Button variant="outline" size="xs" borderRadius="full">
                    Upgrade
                  </Button>
                }
              />
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MenuComponent;
