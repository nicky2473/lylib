import produce from "immer";
import create from "zustand";

interface Library {
  name: string;
  color: string;
  fullPath: string;
}

type Option = "libraryName" | "libraryOwner" | "libraryIcon";

type Store = {
  selectedLibraries: Library[];
  options: {
    [key in Option]: boolean;
  };
  addLibrary: (library: Library) => void;
  removeLibrary: (name: string) => void;
  toggleOption: (target: Option) => void;
  updateFullPath: (name: string, fullpath: string) => void;
};

const useWorkspace = create<Store>((set, get) => ({
  selectedLibraries: [],
  options: {
    libraryName: true,
    libraryOwner: false,
    libraryIcon: true,
  },
  addLibrary: (library) =>
    set((state) =>
      produce(state, (draft) => {
        if (!draft.selectedLibraries.find((elem) => elem.name === library.name))
          draft.selectedLibraries.push(library);
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
  toggleOption: (target) =>
    set((state) =>
      produce(state, (draft) => {
        draft.options[target] = !get().options[target];
      })
    ),
  updateFullPath: (name, fullPath) =>
    set((state) =>
      produce(state, (draft) => {
        const target = draft.selectedLibraries.find(
          (elem) => elem.name === name
        );
        target.fullPath = fullPath;
      })
    ),
}));

export default useWorkspace;
