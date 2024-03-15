import { SortEnum } from '../enums/sortEnum';

export const compareObject = (
  objectOne: Record<string, any>,
  objectTwo: Record<string, any>,
  orderDirection: SortEnum,
  orderBy: string,
) => {
  const shouldReverse = orderDirection === SortEnum.Desc;
  const valueOne = objectOne[orderBy];
  const valueTwo = objectTwo[orderBy];
  const compareRes =
    typeof valueOne === 'number' && typeof valueTwo === 'number'
      ? compareNumber(valueOne, valueTwo)
      : typeof valueOne === 'string' && typeof valueTwo === 'string'
      ? compareString(valueOne, valueTwo)
      : -1;
  return compareRes * (shouldReverse ? -1 : 1);
};

export const compareNumber = (numberOne: number, numberTwo: number) =>
  numberOne - numberTwo;

export const compareString = (strOne: string, strTwo: string) =>
  strOne.toLowerCase().localeCompare(strTwo.toLowerCase());

export const containString = (container: string, search: string) =>
  container.toLowerCase().includes(search.toLowerCase());
