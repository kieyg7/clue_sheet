import { atom } from 'recoil';

interface INameList {
  [key: string]: { id: string; title: string }[];
}

const nameListByLocalStorage = window.localStorage.getItem('nameList');
const nameList: INameList | undefined = !nameListByLocalStorage ? undefined : JSON.parse(nameListByLocalStorage);
const userListByLocalStorage = window.localStorage.getItem('userList');
const userList: string[] | undefined = !userListByLocalStorage ? undefined : JSON.parse(userListByLocalStorage);

const localStorageData = {
  suspect: !nameList || !nameList.suspect ? undefined : nameList.suspect,
  tool: !nameList || !nameList.tool ? undefined : nameList.tool,
  place: !nameList || !nameList.place ? undefined : nameList.place,
  user: !userList ? undefined : userList,
};

const UserNumberState = atom({
  key: 'UserNumber',
  default: {
    cnt: !localStorageData.user ? 4 : localStorageData.user.length,
  },
});

const UserName = atom({
  key: 'UserName',
  default: !localStorageData.user ? ['A', 'B', 'C', 'D'] : localStorageData.user,
});

const SuspectName = atom({
  key: 'SuspectName',
  default: !localStorageData.suspect
    ? [
        { id: '0', title: '피콕' },
        { id: '1', title: '플럼' },
        { id: '2', title: '스칼렛' },
        { id: '3', title: '머스타드' },
        { id: '4', title: '그린' },
        { id: '5', title: '화이트' },
      ]
    : localStorageData.suspect,
});

const ToolName = atom({
  key: 'ToolName',
  default: [
    { id: '0', title: '파이프' },
    { id: '1', title: '밧줄' },
    { id: '2', title: '단검' },
    { id: '3', title: '렌치' },
    { id: '4', title: '권총' },
    { id: '5', title: '촛대' },
  ],
});

const PlaceName = atom({
  key: 'PlaceName',
  default: [
    { id: '0', title: '침실' },
    { id: '1', title: '욕실' },
    { id: '2', title: '마당' },
    { id: '3', title: '식당' },
    { id: '4', title: '차고' },
    { id: '5', title: '게임룸' },
    { id: '6', title: '서재' },
    { id: '7', title: '거실' },
    { id: '8', title: '부엌' },
  ],
});

const BoardData = atom({
  key: 'BoardData',
  default: {
    suspect: {
      0: ['-', '-', '-', '-', '-', '-', '-'],
      1: ['-', '-', '-', '-', '-', '-', '-'],
      2: ['-', '-', '-', '-', '-', '-', '-'],
      3: ['-', '-', '-', '-', '-', '-', '-'],
      4: ['-', '-', '-', '-', '-', '-', '-'],
      5: ['-', '-', '-', '-', '-', '-', '-'],
      6: ['-', '-', '-', '-', '-', '-', '-'],
    },
    tool: {
      0: ['-', '-', '-', '-', '-', '-', '-'],
      1: ['-', '-', '-', '-', '-', '-', '-'],
      2: ['-', '-', '-', '-', '-', '-', '-'],
      3: ['-', '-', '-', '-', '-', '-', '-'],
      4: ['-', '-', '-', '-', '-', '-', '-'],
      5: ['-', '-', '-', '-', '-', '-', '-'],
    },
    place: {
      0: ['-', '-', '-', '-', '-', '-', '-'],
      1: ['-', '-', '-', '-', '-', '-', '-'],
      2: ['-', '-', '-', '-', '-', '-', '-'],
      3: ['-', '-', '-', '-', '-', '-', '-'],
      4: ['-', '-', '-', '-', '-', '-', '-'],
      5: ['-', '-', '-', '-', '-', '-', '-'],
      6: ['-', '-', '-', '-', '-', '-', '-'],
      7: ['-', '-', '-', '-', '-', '-', '-'],
      8: ['-', '-', '-', '-', '-', '-', '-'],
      9: ['-', '-', '-', '-', '-', '-', '-'],
    },
  },
});

export { UserNumberState, UserName, SuspectName, ToolName, PlaceName, BoardData };
