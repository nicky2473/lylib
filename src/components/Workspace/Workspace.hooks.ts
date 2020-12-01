import produce from "immer";
import create from "zustand";

type Store = {
  selectedLibraries: string[];
  addLibrary: (name: string) => void;
  removeLibrary: (name: string) => void;
};

const useWorkspace = create<Store>((set) => ({
  selectedLibraries: [],
  addLibrary: (name) =>
    set((state) =>
      produce(state, (draft) => {
        if (!draft.selectedLibraries.find((elem) => elem === name)) {
          draft.selectedLibraries.push(name);
        }
      })
    ),
  removeLibrary: (name) =>
    set((state) =>
      produce(state, (draft) => {
        draft.selectedLibraries.splice(
          draft.selectedLibraries.findIndex((elem) => elem === name),
          1
        );
      })
    ),
}));

export default useWorkspace;
