import { create, StateCreator } from "zustand";

interface BookSlice {
  description: string;
  imageSize: string;
  name: string;
  viewing: boolean;
  setDescription: (s: string) => void;
  setImageSize: (s: string) => void;
  setName: (s: string) => void;
  setViewing: (b: boolean) => void;
}

const createBookSlice: StateCreator<BookSlice> = (set) => ({
  description: "",
  imageSize: "200",
  name: "",
  viewing: false,
  setDescription: (s: string) => set(() => ({ description: s })),
  setImageSize: (s: string) => set(() => ({ imageSize: s })),
  setName: (s: string) => set(() => ({ name: s })),
  setViewing: (b: boolean) => set(() => ({ viewing: b })),
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

export const useBoundStore = create<BookSlice & PeopleSlice>()((...a) => ({
  ...createBookSlice(...a),
  ...createPeopleSlice(...a),
}));
