import { Flex, Heading, Icon, Switch, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppRoutesUI } from "../config/appRoute";
import { PropsWithChildren } from "react";
import { RiVolumeUpLine, RiMic2Line, RiFileUploadLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

  const handleLanguageChange = async () =>
    await i18n.changeLanguage(i18n.language.includes("en") ? "bn" : "en");

  return (
    <Flex direction="column" height="100%">
      <Heading size="2xl" p={3} pt={10} flexShrink={1} textAlign="center">
        {t("title")}
      </Heading>
      <Flex direction="column" flexGrow={1} p={3}>
        <SideNavItem icon={RiMic2Line} to={AppRoutesUI.STT()}>
          {t("speechToText")}
        </SideNavItem>
        <SideNavItem icon={RiVolumeUpLine} to={AppRoutesUI.TTS()}>
          {t("textToSpeech")}
        </SideNavItem>
        <SideNavItem icon={RiFileUploadLine} to={AppRoutesUI.TTS()}>
          {t("uploadModel")}
        </SideNavItem>
        <Flex fontSize="lg" mt={5} alignItems="center" justifyContent="center">
          <Text>বাংলা</Text>
          <Switch
            isChecked={i18n.language.includes("en")}
            onChange={handleLanguageChange}
            size="lg"
            mx={2}
          />
          <Text>English</Text>
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
