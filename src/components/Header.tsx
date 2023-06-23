import { useState } from 'react';
import styled from 'styled-components';
import { motion, MotionConfig } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@chakra-ui/react';
import { faUserPlus, faPenToSquare, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { useResetRecoilState } from 'recoil';

import { BoardData } from 'atom';
import { ClueLogo, EditedGridIcon, EmptyGridIcon, CheckedGridIcon } from 'assets/icons';
import UserModal from './UserModal';
import NameModal from './NameModal';

const Header = () => {
  const [hideAnimationTag, setHideAnimationTag] = useState(false);
  const [editMode, setEditMode] = useState({ user: false, name: false, reset: false });
  const closeSet = { name: false, user: false, reset: false };
  const modalClose = () => setEditMode(closeSet);

  // Animation
  const x = [0, (Math.PI / 2) * 10, Math.PI * 20, (Math.PI / 2) * 10, 0];
  const y = [0, Math.sin(Math.PI / 2) * 12, Math.sin(Math.PI) * 20, -2 * Math.sin(Math.PI / 2), 0];
  const blurLogo = {
    init: { filter: 'blur(5px)' },
    animate: { filter: 'blur(0)' },
  };
  const logoAnimation = {
    init: { x: 0, y: 0 },
    animate: {
      x,
      y,
    },
  };
  const magnifyAnimation = {
    init: { x: 0, y: 0 },
    animate: {
      x: x.map(obj => -1 * obj),
      y: y.map(obj => -1 * obj),
    },
  };

  // reset
  const onBoardRest = useResetRecoilState(BoardData);
  const onClearBoard = () => {
    const confirm = window.confirm('표기된 마크를 전부 삭제합니다.');
    if (confirm) {
      onBoardRest();
      modalClose();
    }
  };

  const onResetGrid = () => {
    const confirm = window.confirm('유저, 이름 등 전부 초기화 됩니다.');
    if (confirm) {
      // delete localstorage
      localStorage.removeItem('nameList');
      localStorage.removeItem('userList');
      // onBoardRest();
      // modalClose();
      window.location.reload();
    }
  };

  return (
    <HeaderStyle>
      {/* Logo - blur */}
      <motion.div
        className="logoWrap"
        variants={blurLogo}
        initial="initial"
        animate="animate"
        style={{ filter: 'blur(5px)' }}
        transition={{ delay: 5.7, duration: 1, type: 'linear' }}
      >
        <ClueLogo />
      </motion.div>

      {/* Animation Start */}
      <MotionConfig transition={{ duration: 3, type: 'tween', repeat: 1 }}>
        <motion.div
          className="iconWrap"
          variants={logoAnimation}
          initial="initial"
          animate="animate"
          onAnimationComplete={() => {
            setHideAnimationTag(true);
          }}
          style={{ scale: hideAnimationTag ? 0 : 1.05, opacity: hideAnimationTag ? 0 : 1 }}
        >
          <ClueLogo variants={magnifyAnimation} />
        </motion.div>
        <motion.div
          className="magnify-stick"
          variants={logoAnimation}
          initial="initial"
          animate="animate"
          style={{ rotate: -40, opacity: hideAnimationTag ? 0 : 1 }}
        />
      </MotionConfig>
      {/* Animation End */}

      {/*Name Edit*/}
      <ButtonStyle
        onClick={() => setEditMode({ ...closeSet, user: !editMode.user })}
        name={'user'}
        variant={'outline'}
        size={'lg'}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </ButtonStyle>

      {/*User Edit*/}
      <ButtonStyle
        onClick={() => setEditMode({ ...closeSet, name: !editMode.name })}
        name={'name'}
        variant={'outline'}
        size={'lg'}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </ButtonStyle>

      {/*Reset*/}
      <ButtonStyle
        variant={'outline'}
        size={'lg'}
        className={'reset-btn-wrap'}
        onClick={() => setEditMode({ ...closeSet, reset: !editMode.reset })}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </ButtonStyle>
      {editMode.reset && (
        <MotionConfig transition={{ duration: 0.35, type: 'tween' }}>
          <motion.div className="modal-bg" onClick={modalClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          <ResetBtnStyle initial={{ x: 0, y: -20, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}>
            <Button variant={'solid'} size={'lg'} onClick={onClearBoard}>
              <CheckedGridIcon />→
              <EmptyGridIcon />
            </Button>
            <Button variant={'solid'} size={'lg'} onClick={onResetGrid}>
              <EditedGridIcon />→
              <EmptyGridIcon />
            </Button>
          </ResetBtnStyle>
        </MotionConfig>
      )}

      {/* Modals */}
      {editMode.user && <UserModal isOpen={editMode.user} onClose={modalClose} />}
      {editMode.name && <NameModal isOpen={editMode.name} onClose={modalClose} />}
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  flex: 0 0 80px;
  width: 100%;
  display: flex;
  align-items: center;

  position: relative;

  .logoWrap {
    width: 90px;
    height: 50px;
    position: absolute;
    top: 20px;
    left: 10px;
    z-index: 5;
    svg {
      width: 90px;
    }
  }

  .iconWrap {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 15px;
    left: 5px;
    z-index: 10;
    background: #fff;
    border-radius: 50%;
    border: 4px solid #434343;
    box-shadow: -3px 2px 2px rgba(0, 0, 0, 0.3), inset 0 0 4px rgba(#111, 0.4);
    overflow: hidden;
    svg {
      width: 90px;
      position: relative;
    }
  }
  .magnify-stick {
    width: 9px;
    height: 25px;
    position: absolute;
    top: 45px;
    left: 40px;
    z-index: 10;

    background: #434343;
    border-radius: 5px;
    box-shadow: -3px 2px 2px rgba(0, 0, 0, 0.3);
    transform: rotate(30deg);
  }

  .modal-bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    background: rgba(0, 0, 0, 0.48);
  }
`;

const ButtonStyle = styled(Button)`
  flex: 0 0 auto;
  height: 100%;
  padding: 1.2rem;
  margin: 0 5px;
  font-size: 24px;
  &:focus,
  &:hover {
    background: none !important;
  }
  &:nth-of-type(1) {
    margin-left: auto;
  }
  .reset-btn-wrap {
    position: relative;
  }
`;

const ResetBtnStyle = styled(motion.div)`
  position: absolute;
  top: calc(100% - 15px);
  right: 5px;
  z-index: 12;
  width: 110px;
  padding: 5px 0;
  display: flex;
  flex-flow: column nowrap;
  & > button {
    flex: 0 0 60px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 2px solid #fff;
    box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 0.95rem;
    &:nth-of-type(1) {
      background: #3182ce;
    }
    &:nth-of-type(2) {
      background: #ce31a6;
    }
    svg {
      flex: 0 0 2rem;
      margin: 0 2px;
      fill: #fff;
    }
  }
`;

export default Header;
