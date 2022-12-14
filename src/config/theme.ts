import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    bg: "#f7f7f8",
    red: "#EF476F",
    blue: "#118AB2",
    green: "#06D6A0",
    yellow: "#FFD166",
    dark: "#073B4C",
  },
};

const theme = extendTheme({ colors });

export default theme;
