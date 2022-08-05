import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppRoutesUI } from "../config/appRoute";

export const SideNav = () => {
  return (
    <Box>
      <Heading size="xl" m={3}>
        বচন
      </Heading>
      <Flex direction="column">
        <Button as={Link} to={AppRoutesUI.STT()} m={2}>
          Speech To Text
        </Button>
        <Button as={Link} to={AppRoutesUI.TTS()} m={2}>
          Text To Speech
        </Button>
      </Flex>
    </Box>
  );
};
