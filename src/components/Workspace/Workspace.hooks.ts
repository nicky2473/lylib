import produce from "immer";
import create from "zustand";

type Store = {
  selectedPackages: string[];
  addPackage: (name: string) => void;
  removePackage: (name: string) => void;
};

const useWorkspace = create<Store>((set) => ({
  selectedPackages: [],
  addPackage: (name) =>
    set((state) =>
      produce(state, (draft) => {
        if (!draft.selectedPackages.find((elem) => elem === name)) {
          draft.selectedPackages.push(name);
        }
      })
    ),
  removePackage: (name) =>
    set((state) =>
      produce(state, (draft) => {
        draft.selectedPackages.splice(
          draft.selectedPackages.findIndex((elem) => elem === name),
          1
        );
      })
    ),
}));

export default useWorkspace;
