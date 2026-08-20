import { ChatGPTPlusIcon } from "@/icons/other-icons";
import {
  Box,
  Button,
  Circle,
  HStack,
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
    <HStack>
      <Circle size="8">{icon}</Circle>
      <Stack gap="0">
        <Text>{title}</Text>
        <Text fontSize="xs">{description}</Text>
      </Stack>
      <Box>{element}</Box>
    </HStack>
  );
}
const MenuComponent = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          CoralTB
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-txt">
              <MenuItemDetail
                icon={<ChatGPTPlusIcon boxSize="4" />}
                title="CoralTB plus"
                description="Better models"
                element={
                  <Button variant="outline" size="sm" borderRadius="full">
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
