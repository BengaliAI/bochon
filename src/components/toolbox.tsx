import { Center, CenterProps, Flex, Icon, Spinner } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

export const ToolBoxContainer = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      borderRadius="xl"
      fontSize={["md", "lg", "xl"]}
      overflow="hidden"
      shadow="sm"
      sx={{
        "&>div": {
          py: [3, 3, 5],
          px: [5, 5, 10],
          borderRight: "1px solid #ddd",
          cursor: "pointer",
          transition: "background 0.3s ease",
          _hover: { background: "#fff8" },
        },
        "&>div:not(.record-button)": {
          background: "white",
          _hover: { background: "#fff8" },
        },
        "&>div:last-child": {
          border: "none",
        },
      }}
    >
      {children}
    </Flex>
  );
};

type ToolBoxItemProps = CenterProps & {
  icon: IconType;
  title: string;
  isLoading?: boolean;
};

export const ToolBoxItem = ({
  icon,
  title,
  isLoading,
  ...rest
}: ToolBoxItemProps) => {
  return (
    <Center title={title} {...rest}>
      {isLoading ? <Spinner size="sm" /> : <Icon as={icon} />}
    </Center>
  );
};
