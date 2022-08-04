import { Button, Center, Heading, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import RecordRTC from "recordrtc";

export const STT = () => {
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setRecordedAudio(null);
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const audioRecorder = new RecordRTC(audioStream, {
      type: "audio",
    });
    audioRecorder.startRecording();
    setIsRecording(true);
    setRecorder(audioRecorder);
  };

  const stopRecording = async () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
      });
    }
    setIsRecording(false);
  };

  return (
    <Center w="100%" flexDir="column" p={5} maxW={800} mx="auto">
      <Heading size="xl" mb={3}>
        STT
      </Heading>
      <Textarea placeholder="Text will appear here..." />
      <Stack direction="row" spacing={4} mt={3}>
        <Button
          colorScheme="green"
          variant="solid"
          size="lg"
          onClick={startRecording}
          isLoading={isRecording}
          //   spinner={<Bars color="white" />}
        >
          Start
        </Button>
        {isRecording && (
          <Button
            colorScheme="red"
            variant="solid"
            size="lg"
            onClick={stopRecording}
          >
            Stop
          </Button>
        )}

        {recordedAudio && (
          <Button
            colorScheme="blue"
            variant="solid"
            size="lg"
            onClick={() => console.log(recordedAudio)}
          >
            Download
          </Button>
        )}
        {recordedAudio && (
          <audio controls src={URL.createObjectURL(recordedAudio)}></audio>
        )}
      </Stack>
    </Center>
  );
};
