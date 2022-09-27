export const LocalStorageHandler = {
  getSTTModelIndex: () => {
    return parseInt(localStorage.getItem("sttModelIndex") || "0");
  },
  setSTTModelIndex: (index: number | string) => {
    localStorage.setItem("sttModelIndex", index.toString());
  },
  getTTSModelIndex: () => {
    return parseInt(localStorage.getItem("ttsModelIndex") || "0");
  },
  setTTSModelIndex: (index: number | string) => {
    localStorage.setItem("ttsModelIndex", index.toString());
  },
  clear: () => {
    localStorage.clear();
  },
};
