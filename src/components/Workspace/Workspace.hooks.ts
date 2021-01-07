import produce from "immer";
import create from "zustand";

interface Library {
  name: string;
  color: string;
}

type Store = {
  selectedLibraries: Library[];
  addLibrary: (library: Library) => void;
  removeLibrary: (name: string) => void;
};

const useWorkspace = create<Store>((set) => ({
  selectedLibraries: [],
  addLibrary: (library) =>
    set((state) =>
      produce(state, (draft) => {
        if (
          !draft.selectedLibraries.find((elem) => elem.name === library.name)
        ) {
          draft.selectedLibraries.push(library);
        }
      })
    ),
  removeLibrary: (name) =>
    set((state) =>
      produce(state, (draft) => {
        draft.selectedLibraries.splice(
          draft.selectedLibraries.findIndex((elem) => elem.name === name),
          1
        );
      })
    ),
}));

export default useWorkspace;
