import { faker } from "@faker-js/faker";

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  dateOfBirth: Date;
  age: number;
  visits: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  createdAt: faker.date.between(
    "2020-01-01T00:00:00.000Z",
    "2030-01-01T00:00:00.000Z",
  ),
  dateOfBirth: faker.date.between(
    "1967-01-01T00:00:00.000Z",
    "2023-01-01T00:00:00.000Z",
  ),
  age: faker.datatype.number(112),
  visits: faker.datatype.number(1000),
  status: faker.helpers.shuffle<Person["status"]>([
    "relationship",
    "complicated",
    "single",
  ])[0]!,
});

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map(
      (): Person => ({
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }),
    );
  };

  return makeDataLevel();
}
