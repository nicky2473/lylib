import produce from "immer";
import create from "zustand";

interface Library {
  name: string;
  color: string;
}

type Option = "libraryName" | "libraryOwner" | "libraryIcon";

type Store = {
  selectedLibraries: Library[];
  optionVisible: boolean;
  options: {
    [key in Option]: boolean;
  };
  addLibrary: (library: Library) => void;
  removeLibrary: (name: string) => void;
  toggleOptionVisible: () => void;
  toggleOption: (target: Option) => void;
};

const useWorkspace = create<Store>((set, get) => ({
  selectedLibraries: [],
  optionVisible: false,
  options: {
    libraryName: true,
    libraryOwner: false,
    libraryIcon: true,
  },
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
  toggleOptionVisible: () => set({ optionVisible: !get().optionVisible }),
  toggleOption: (target) =>
    set((state) =>
      produce(state, (draft) => {
        draft.options[target] = !get().options[target];
      })
    ),
}));

export default useWorkspace;
