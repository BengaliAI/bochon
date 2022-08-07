import { Flex, Heading, Icon, Switch, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppRoutesUI } from "../config/appRoute";
import { PropsWithChildren } from "react";
import { RiVolumeUpLine, RiMic2Line, RiUserLine } from "react-icons/ri";

const SideNavItem = ({
  children,
  icon,
  to,
}: PropsWithChildren<{ icon: any; to: string }>) => {
  return (
    <Flex
      as={Link}
      to={to}
      my={2}
      mx={3}
      p={5}
      px={8}
      bg="white"
      shadow="md"
      borderRadius="xl"
      transition="all 0.3s ease"
      fontSize="lg"
      alignItems="center"
      _hover={{
        shadow: "lg",
      }}
    >
      <Icon as={icon} me={3} fontSize="2xl" />
      <span>{children}</span>
    </Flex>
  );
};

export const SideNav = () => {
  return (
    <Flex direction="column" height="100vh">
      <Heading size="2xl" p={3} pt={10} flexShrink={1} textAlign="center">
        বচন
      </Heading>
      <Flex direction="column" flexGrow={1} p={3}>
        <SideNavItem icon={RiMic2Line} to={AppRoutesUI.STT()}>
          Speech To Text
        </SideNavItem>
        <SideNavItem icon={RiVolumeUpLine} to={AppRoutesUI.TTS()}>
          Text To Speech
        </SideNavItem>
        <SideNavItem icon={RiUserLine} to={AppRoutesUI.TTS()}>
          Admin Panel
        </SideNavItem>
        <Flex fontSize="lg" mt={5} alignItems="center" justifyContent="center">
          <Text>BN</Text>
          <Switch size="lg" mx={2} />
          <Text>EN</Text>
        </Flex>
      </Flex>
      <Text
        flexShrink={1}
        textAlign="center"
        fontSize="xs"
        p={3}
        color="gray.500"
        borderTop="1px solid #0002"
      >
        Powered By{" "}
        <Text as="a" textDecor="underline" href="https://bengali.ai/">
          Bengali.AI
        </Text>
        <br />
        Developed with ❤️ by{" "}
        <Text
          as="a"
          textDecor="underline"
          href="https://khanshaheb34.github.io/"
        >
          KhanShaheb34
        </Text>
      </Text>
    </Flex>
  );
};
