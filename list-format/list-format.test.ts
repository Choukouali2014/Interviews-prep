import listFormat from "./list-format";

describe("listFormat", () => {
  test("empty", () => {
    expect(listFormat([])).toEqual("");
  });

  test("one item", () => {
    expect(listFormat(["Bob"])).toEqual("Bob");
    expect(listFormat(["Bob"], { length: 2 })).toEqual("Bob");
  });

  test("two items", () => {
    expect(listFormat(["Bob", "Alice"])).toEqual("Bob and Alice");
  });

  test("many items", () => {
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
        length: 3,
        unique: true,
      }),
    ).toEqual("Bob, Ben, Tim and 2 others");
  });

  test("remove empty", () => {
    expect(listFormat(["Bob", "Ben", "", "", "John"])).toEqual(
      "Bob, Ben and John",
    );
  });
});
