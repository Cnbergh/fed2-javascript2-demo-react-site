import { expect, test } from "vitest";

function multiplyByThree(value) {
  if (typeof value !== "number") {
    throw new Error("Value must be numerical");
  }
  return value * 3;
}

test("1. It accepts a numerical argument and returns that argument multiplied by three", () => {
  expect(multiplyByThree(2)).toBe(6);
});

test("2. It throws an error when provided with a non-numerical type value", () => {
  expect(() => multiplyByThree([1, 2, 3])).toThrowError();
  expect(() => multiplyByThree({ a: "b" })).toThrowError();
  expect(() => multiplyByThree("2")).toThrowError();
});
