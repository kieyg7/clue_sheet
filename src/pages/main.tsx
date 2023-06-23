import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PlaceName, SuspectName, ToolName, UserName, UserNumberState } from '../atom';

import Grid from 'components/Grid';

const MainPage = () => {
  const { cnt } = useRecoilValue(UserNumberState);
  const userName = useRecoilValue(UserName);

  const suspectName = useRecoilValue(SuspectName);
  const toolName = useRecoilValue(ToolName);
  const placeName = useRecoilValue(PlaceName);

  return (
    <MainPageWrap>
      {/*  user list*/}
      <UserGridWrap className="user-name-wrap" cnt={cnt}>
        <div />
        {userName.length > 0 &&
          userName.map((name, inx) => {
            return <div key={`user-name-${name}-${inx}`}>{name}</div>;
          })}
      </UserGridWrap>
      <h4 style={{ background: '#87aafb' }}>Suspect</h4>
      <Grid names={suspectName} cnt={cnt} type={'suspect'} />
      <h4 style={{ background: '#4abaea' }}>Tool</h4>
      <Grid names={toolName} cnt={cnt} type={'tool'} />
      <h4 style={{ background: '#0cc9d5' }}>Place</h4>
      <Grid names={placeName} cnt={cnt} type={'place'} />
    </MainPageWrap>
  );
};

const MainPageWrap = styled.div`
  width: 100%;
  max-height: 100%;
  padding-bottom: 100px;
  border-bottom: 2px solid #aaa;
  display: flex;
  flex-flow: column;
  overflow: hidden auto;
  position: relative;
  z-index: 5;
  h4 {
    padding: 5px 10px 2px;
    margin: -1px 0;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
    //box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.5);
  }
`;

const UserGridWrap = styled.div<{ cnt: number }>`
  flex: 0 0 auto;
  width: 100%;
  margin: 5px 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 100px repeat(${props => props.cnt}, 1fr);
  grid-auto-rows: 44px;
  grid-gap: 0;
  background: #fff;
  border-left: 1px solid transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  & > div {
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-bottom: 4px solid #fff;
    border-radius: 5px 5px 0 0;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
    &:not(:first-child) {
      background: color(srgb 0.603 0.6547 0.7243);
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
    }
  }
`;

export default MainPage;
