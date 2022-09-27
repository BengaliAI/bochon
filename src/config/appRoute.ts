export const AppRoutesUI = {
  BaseName: process.env?.REACT_APP_BASE_PATH || "",
  Root: "/",
  STT: () => AppRoutesUI.Root + "stt/",
  TTS: () => AppRoutesUI.Root + "tts/",
  upload: () => AppRoutesUI.Root + "upload/",
};

export const SocketURL = process.env?.REACT_APP_SOCKET_URL || "";
