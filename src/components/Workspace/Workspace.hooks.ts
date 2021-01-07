import produce from "immer";
import create from "zustand";

interface Library {
  name: string;
  color: string;
}

type Store = {
  selectedLibraries: Library[];
  optionVisible: boolean;
  addLibrary: (library: Library) => void;
  removeLibrary: (name: string) => void;
  toggleOptionVisible: () => void;
};

const useWorkspace = create<Store>((set, get) => ({
  selectedLibraries: [],
  optionVisible: false,
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
  toggleOptionVisible: () => {
    const optionVisible = get().optionVisible;

    set({ optionVisible: !optionVisible });
  },
}));

export default useWorkspace;
