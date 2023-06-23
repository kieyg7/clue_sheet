import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { UserName, UserNumberState } from 'atom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserEditModal = ({ isOpen, onClose }: IProps) => {
  const [userName, setUserName] = useRecoilState(UserName);
  const [userCnt, setUserCnt] = useRecoilState(UserNumberState);
  const [userList, setUserList] = useState(userName);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: { [key: string]: string }) => {
    const keys = Object.keys(data);
    const arr: string[] = [];
    keys.forEach(inx => arr.push(data[inx]));

    const result = arr.slice(0, userList.length);
    setUserName(result);

    if (userCnt.cnt !== userList.length) {
      setUserCnt({ cnt: userList.length });
    }

    // save localStorage
    const localStorageObj = JSON.stringify(result);
    window.localStorage.setItem('userList', localStorageObj);

    onClose();
  };

  const onAddRow = () => {
    setUserList([...userList, `user${userList.length}`]);
  };

  const onDeleteRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const arr = [...userList];
    arr.pop();
    setUserList(arr);
  };

  return (
    <RootWrap>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>User Edit</ModalHeader>
            <ModalCloseButton />
            <ModalBodyStyled>
              {userList.map((obj, inx) => {
                const name = !obj ? `user${inx + 1}` : obj;
                return (
                  <motion.div key={`user-info-modify-${name}-${inx}`} className={'row'}>
                    <Input
                      {...register(`${inx}`, { required: true })}
                      defaultValue={name}
                      placeholder={'이름을 입력하세요'}
                    />
                  </motion.div>
                );
              })}

              <div className={'btn-group'}>
                <Button onClick={onAddRow} colorScheme={'gray'}>
                  <FontAwesomeIcon icon={faPlus} />
                  Add
                </Button>
                <Button onClick={onDeleteRow} colorScheme={'gray'}>
                  <FontAwesomeIcon icon={faMinus} />
                  Remove
                </Button>
              </div>
            </ModalBodyStyled>

            <ModalFooter>
              <Button type={'submit'} colorScheme={'blue'}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </RootWrap>
  );
};

const RootWrap = styled(motion.div)``;

const ModalBodyStyled = styled(ModalBody)`
  .row {
    display: flex;
    margin-bottom: 5px;
    input {
      flex: 1 1 auto;
      margin-right: 5px;
    }
    button {
      color: red;
    }
  }
  .btn-group {
    padding: 10px 0;
    button {
      margin-right: 10px;
      svg {
        margin-right: 5px;
      }
    }
  }
`;

export default UserEditModal;
