import { TextAreaContainer } from "./textarea";
import { RiFileUploadLine, RiUploadLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Center, Icon, Text } from "@chakra-ui/react";

export const UploadArea = () => {
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/JSON": [".json"] },
  });

  return (
    <TextAreaContainer icon={RiFileUploadLine} title={t("uploadModel")}>
      <Center
        flexDir="column"
        color="gray.500"
        height="100%"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon fontSize="9xl" as={RiUploadLine} />
        <Text fontSize="lg" p={10} textAlign="center">
          {t("uploadText")}
        </Text>
      </Center>
    </TextAreaContainer>
  );
};
