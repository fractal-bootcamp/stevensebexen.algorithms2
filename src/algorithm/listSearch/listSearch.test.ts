
import { describe, test, expect } from "vitest";
import { linearSearch } from "./linearSearch";
import { binarySearch } from "./binarySearch";

describe('linearSearch', () => {
  test('Basic case', () => {
    const input: ListSearchParams = {arr: ['dragon', 'drake', 'kirin', 'wyvern'], searchTarget: 'kirin'};
    const expected = 2;
    const result = linearSearch(input).value;

    expect(result).toBe(expected);
  });

  test('Not found', () => {
    const input: ListSearchParams = {arr: ['dragon', 'drake', 'kirin', 'wyvern'], searchTarget: 'wyrm'};
    const expected = -1;
    const result = linearSearch(input).value;

    expect(result).toBe(expected);
  });

  test('Empty array', () => {
    const input: ListSearchParams = {arr: [], searchTarget: 'dragon'};
    const expected = -1;
    const result = linearSearch(input).value;

    expect(result).toBe(expected);
  });
});

describe('binarySearch', () => {
  test('Basic case', () => {
    const input: ListSearchParams = {arr: ['dragon', 'drake', 'kirin', 'wyvern'], searchTarget: 'kirin'};
    const expectedValue = 2;
    const expectedHistory = [1, 2];
    const result = binarySearch(input);

    expect(result.value).toBe(expectedValue);
    expect(result.history).toEqual(expectedHistory);
  });

  test('Not found', () => {
    const input: ListSearchParams = {arr: ['dragon', 'drake', 'kirin', 'wyvern'], searchTarget: 'wyrm'};
    const expected = -1;
    const result = binarySearch(input).value;

    expect(result).toBe(expected);
  });

  test('Empty array', () => {
    const input: ListSearchParams = {arr: [], searchTarget: 'dragon'};
    const expected = -1;
    const result = binarySearch(input).value;

    expect(result).toBe(expected);
  });

  test('Duplicate elements', () => {
    const input: ListSearchParams = {arr: ['dragon', 'dragon', 'dragon', 'dragon', 'dragon', 'dragon', 'dragon'], searchTarget: 'dragon'};
    const expected = 3;
    const result = binarySearch(input).value;

    expect(result).toBe(expected);
  });

  test('Longer path', () => {
    const input: ListSearchParams = {arr: ['blackdragon', 'bluedragon', 'dragon', 'dragondragon', 'drake', 'greendragon', 'kirin', 'reddragon', 'whitedragon'], searchTarget: 'dragondragon'}
    const expectedValue = 3;
    const expectedHistory = [4, 1, 2, 3];
    const result = binarySearch(input);

    expect(result.value).toBe(expectedValue);
    expect(result.history).toEqual(expectedHistory);
  });
});