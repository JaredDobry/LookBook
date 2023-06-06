import { create, StateCreator } from "zustand";

interface ConfigSlice {
  export: boolean;
  imageSize: string;
  setExport: () => void;
  setImageSize: (s: string) => void;
}

const createConfigSlice: StateCreator<ConfigSlice> = (set) => ({
  export: false,
  imageSize: "200",
  setExport: () => set(() => ({ export: true })),
  setImageSize: (s: string) => set(() => ({ imageSize: s })),
});

export type Person = {
  biography: string;
  id: number;
  name: string;
  photo: string;
};

const comparePeopleById = (a: Person, b: Person) => {
  return a.id - b.id;
};

interface PeopleSlice {
  addPerson: (person: Person) => void;
  clearPeople: () => void;
  people: Person[];
  removePerson: (person: Person) => void;
  setPeople: (people: Person[]) => void;
  swapPeople: (l: Person, r: Person) => void;
  updatePerson: (person: Person) => void;
}

const createPeopleSlice: StateCreator<PeopleSlice> = (set) => ({
  addPerson: (person: Person) =>
    set((state) => ({ people: [...state.people, person] })),
  clearPeople: () => set(() => ({ people: [] })),
  people: [],
  removePerson: (person: Person) =>
    set((state) => ({
      people: state.people.filter((value: Person) => {
        return value.id !== person.id;
      }),
    })),
  setPeople: (people: Person[]) => set(() => ({ people: people })),
  swapPeople: (l: Person, r: Person) =>
    set((state) => ({
      people: [
        ...state.people.filter((value: Person) => {
          return value.id !== l.id && value.id !== r.id;
        }),
        { ...l, id: r.id },
        { ...r, id: l.id },
      ].sort(comparePeopleById),
    })),
  updatePerson: (person: Person) =>
    set((state) => ({
      people: [
        ...state.people.filter((value: Person) => {
          return value.id !== person.id;
        }),
        person,
      ].sort(comparePeopleById),
    })),
});

export const useBoundStore = create<ConfigSlice & PeopleSlice>()((...a) => ({
  ...createConfigSlice(...a),
  ...createPeopleSlice(...a),
}));
