import { Select, Textarea, Flex, Icon, Box, Text } from "@chakra-ui/react";
import { RiMic2Line } from "react-icons/ri";

export const TextAreaBox = () => {
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
        alignItems="center"
        borderBottom="1px solid #ddd"
        flexShrink={1}
      >
        <Flex fontSize={20} alignItems="center">
          <Icon as={RiMic2Line} me={3} fontSize={25} />
          <span>Speech To Text</span>
        </Flex>
        <Select placeholder="Select Model" width="50%">
          <option value="azure">Microsoft Azure</option>
          <option value="gcp">Google Cloud</option>
          <option value="aws">Amazon AWS</option>
        </Select>
      </Flex>
      <Box
        fontSize={18}
        bg="transparent"
        border="none"
        height="100%"
        flexGrow={1}
        px={10}
        py={5}
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac
          dolor convallis, blandit libero quis, convallis urna. Nullam augue
          lectus, sollicitudin vel iaculis ac, facilisis non dolor. Mauris
          hendrerit velit elit, nec mattis urna sagittis vel. Mauris nec purus
          ac augue sodales consectetur. Maecenas vulputate dictum nunc, quis
          tempus enim posuere in. In eget ipsum lobortis, semper lacus blandit,
          mattis tortor. Sed accumsan urna et sapien accumsan gravida. Duis
          luctus arcu in scelerisque suscipit. Duis odio metus, laoreet eu enim
          a, tempor ultrices lorem. Sed luctus mollis nibh. Aenean aliquet
          gravida tempor.
        </Text>
        <br />
        <Text>
          Phasellus auctor, leo quis tempus placerat, risus augue porttitor
          metus, quis posuere enim nisl non enim. Aliquam erat volutpat. Quisque
          eget nisi sem. Pellentesque accumsan, velit at porta aliquam, dolor
          sem suscipit turpis, id aliquam neque orci in magna. Aenean urna
          velit, tempus in nibh non, tristique facilisis massa. Aliquam laoreet
          tellus et libero rutrum ullamcorper. Suspendisse ac dolor tristique ex
          pretium scelerisque. Proin laoreet, purus vitae dapibus gravida, eros
          turpis aliquet nulla, vitae tempus sapien quam venenatis lectus.
        </Text>
      </Box>
    </Flex>
  );
};
