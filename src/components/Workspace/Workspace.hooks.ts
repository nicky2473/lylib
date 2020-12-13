import produce from "immer";
import create from "zustand";

type Store = {
  selectedLibraries: Library[];
  addLibrary: (name: Library) => void;
  removeLibrary: (name: string) => void;
};

export class Library {
  name: string;
  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

const useWorkspace = create<Store>((set) => ({
  selectedLibraries: [],
  addLibrary: (library) =>
    set((state) =>
      produce(state, (draft) => {
        if (!draft.selectedLibraries.find((elem) => elem.name === library.name)) {
          draft.selectedLibraries.push(library);
        }
      })
    ),
  removeLibrary: (libraryName) =>
    set((state) =>
      produce(state, (draft) => {
        draft.selectedLibraries.splice(
          draft.selectedLibraries.findIndex((elem) => elem.name === libraryName),
          1
        );
      })
    ),
}));

export default useWorkspace;
