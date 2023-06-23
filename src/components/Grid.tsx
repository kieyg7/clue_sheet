import styled from 'styled-components';
import { Select, Button } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { BoardData } from 'atom';
import { useState } from 'react';

interface IProps {
  names: { id: string; title: string }[];
  cnt: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: 'suspect' | 'tool' | 'place';
}

const GridComponent = ({ names, cnt, type }: IProps) => {
  const [boardData, setBoardData] = useRecoilState(BoardData);

  // Board Data
  const data: { [key: string]: string[] } = boardData[type];
  const getData = (nameInx: string, userInx: number) => {
    const val = data[nameInx];
    if (!val) return '-';

    return val[userInx] || '-';
  };

  const onChangeBoardData = (e: React.ChangeEvent<HTMLSelectElement>, nameInx: string, userInx: number) => {
    const {
      target: { value },
    } = e;
    let result = !data[nameInx] ? ['-', '-', '-', '-', '-', '-', '-'] : data[nameInx];
    if (result.length - 1 < userInx) {
      const temp = [...result];
      temp[userInx] = value;
      result = temp;
    } else {
      const temp = [...result];
      temp.splice(userInx, 1, value);
      result = temp;
    }
    setBoardData({ ...boardData, [type]: { ...data, [nameInx]: result } });
  };

  // Disable
  const [disabledList, setDisabledList] = useState<string[]>([]);
  const onDisableToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const val = e.currentTarget.getAttribute('data-id');
    if (!val) return false;
    const inx = disabledList.indexOf(val);
    let arr: string[];
    if (inx > -1) {
      arr = [...disabledList];
      arr.splice(inx, 1);
    } else {
      arr = [...disabledList, val];
    }
    setDisabledList(arr);
  };
  const getDisableInfo = (id: string) => {
    const inx = disabledList.indexOf(id);
    return inx > -1;
  };

  return (
    <GridWrap>
      {names.map((obj, inx) => {
        const checkBox = [];
        for (let i = 0; i < cnt; i++) {
          checkBox.push(
            <Select
              key={i}
              disabled={getDisableInfo(obj.id)}
              value={getData(inx + '', i)}
              onChange={e => onChangeBoardData(e, obj.id, i)}
            >
              <option value="-"></option>
              <option value="ask">🗣</option>
              <option value="notSure">🤷🏻</option>
              <option value="dontHave">🙅🏻‍♀️</option>
              <option value="have">🙆🏻‍♂️</option>
              <option value="curiosity">❓</option>
              <option value="none">❌</option>
            </Select>
          );
        }
        return (
          <GridRow key={`grid-row-${inx}`} cnt={cnt} className={getDisableInfo(obj.id) ? 'disabled' : ''}>
            <Button onClick={onDisableToggle} data-id={obj.id} variant={'outline'}>
              {obj.title}
            </Button>
            {checkBox}
          </GridRow>
        );
      })}
    </GridWrap>
  );
};

const GridWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid #bbb;
`;

const GridRow = styled.div<{ cnt: number }>`
  display: grid;
  grid-template-columns: 100px repeat(${props => props.cnt}, 1fr);
  grid-auto-rows: 40px;
  grid-gap: 0;
  border-top: 1px solid #bbb;
  border-left: 1px solid transparent;
  &.disabled {
    background: #efefef;
    button {
      color: #bbb;
    }
  }
  button {
    border: 0;
    border-right: 1px solid #bbb;
    border-radius: 0;
    font-size: 0.9rem;
    &:hover,
    &:focus {
      background: none;
    }
  }
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-right: 1px solid #bbb;

    &:nth-child(even) {
      background: #f0f1f3;
    }

    select {
      width: 100%;
      height: 100%;
      padding: 0 0.2rem;
      border: none;
      border-radius: 0 !important;
      overflow: hidden;
      font-size: 2rem;
      text-align-last: center;
      text-align: center;
      -ms-text-align-last: center;
      -moz-text-align-last: center;
      & ~ .chakra-select__icon-wrapper {
        display: none;
      }
      & > option:nth-child(2) {
        transform: rotate3d(0, 180deg, 0);
      }
    }
  }
`;

export default GridComponent;
