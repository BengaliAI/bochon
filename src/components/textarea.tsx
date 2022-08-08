import { Flex, Icon, Select } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

type TextAreaContainerProps = PropsWithChildren<{
  icon: IconType;
  title: string;
  models: { name: string; value: string }[];
}>;

export const TextAreaContainer = ({
  children,
  icon,
  title,
  models,
}: TextAreaContainerProps) => {
  return (
    <Flex
      direction="column"
      bg="#fff5"
      borderRadius="xl"
      shadow="xl"
      height="100%"
    >
      <Flex
        py={3}
        px={5}
        justifyContent="space-between"
        direction={["column", "column", "row"]}
        alignItems="center"
        borderBottom="1px solid #ddd"
        flexShrink={1}
      >
        <Flex fontSize="xl" alignItems="center">
          <Icon as={icon} me={3} fontSize="2xl" />
          <span>{title}</span>
        </Flex>
        <Select
          placeholder="Select Model"
          width={["100%", "100%", "50%"]}
          mt={[5, 5, 0]}
          defaultValue="azure"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.name}
            </option>
          ))}
        </Select>
      </Flex>
      {children}
    </Flex>
  );
};
