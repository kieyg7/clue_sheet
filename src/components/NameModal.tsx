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
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { PlaceName, SuspectName, ToolName } from 'atom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

type ICategory = 'suspect' | 'tool' | 'place';
type IArrType = { id: string; title: string };

const NameEditModal = ({ isOpen, onClose }: IProps) => {
  const [suspectName, setSuspectName] = useRecoilState(SuspectName);
  const [toolName, setToolName] = useRecoilState(ToolName);
  const [placeName, setPlaceName] = useRecoilState(PlaceName);
  const [nameList, setNameList] = useState<{ suspect: IArrType[]; tool: IArrType[]; place: IArrType[] }>({
    suspect: suspectName,
    tool: toolName,
    place: placeName,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const category: ICategory[] = ['suspect', 'tool', 'place'];

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: { [key: string]: string }) => {
    const keys = Object.keys(data);
    const arr: string[] = [];
    keys.forEach(inx => arr.push(data[inx]));

    const result = Object.keys(data).reduce(
      (res, obj, inx) => {
        const target = obj.split('-');
        const cat = target[0] as ICategory;
        const targetInx = target[1];
        const arr = { id: targetInx, title: data[obj] };
        res[cat] = res[cat].concat([arr]);

        return res;
      },
      { suspect: [], tool: [], place: [] } as { suspect: IArrType[]; tool: IArrType[]; place: IArrType[] }
    );

    const suspects = result.suspect.slice(0, nameList.suspect.length);
    setSuspectName(suspects);

    const tools = result.tool.slice(0, nameList.tool.length);
    setToolName(tools);

    const places = result.place.slice(0, nameList.place.length);
    setPlaceName(places);

    // save localstorage
    const localStorageObj = JSON.stringify({ suspect: suspects, tool: tools, place: places });
    window.localStorage.setItem('nameList', localStorageObj);

    onClose();
  };

  const ButtonComp = (inx: number, key: ICategory) => {
    const target = [...nameList[key]];
    const onAddRow = () => {
      target[target.length] = { id: target.length + '', title: '' };
      setNameList({ ...nameList, [key]: target });
    };
    const onRemoveRow = () => {
      target.pop();
      setNameList({ ...nameList, [key]: target });
    };

    return (
      <div className={'btn-group'}>
        <Button onClick={onAddRow} colorScheme={'gray'}>
          <FontAwesomeIcon icon={faPlus} />
          Add
        </Button>
        <Button onClick={onRemoveRow} colorScheme={'gray'}>
          <FontAwesomeIcon icon={faMinus} />
          Remove
        </Button>
      </div>
    );
  };

  return (
    <RootWrap>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Name Edit</ModalHeader>
            <ModalCloseButton />
            <ModalBodyStyled>
              <Tabs
                size={'md'}
                variant={'line'}
                onChange={index => setTabIndex(index)}
                isLazy={true}
                id={'name-edit-tab'}
              >
                <TabList>
                  <Tab key={0}>Suspect</Tab>
                  <Tab key={1}>Tool</Tab>
                  <Tab key={2}>Place</Tab>
                </TabList>
                {/* suspect */}
                <TabPanels>
                  {category.map((categoryType, categoryInx) => {
                    return (
                      <div key={categoryType} style={{ display: tabIndex === categoryInx ? undefined : 'none' }}>
                        {nameList[categoryType].map((obj, inx) => {
                          const name = !obj.title ? `` : obj.title;
                          return (
                            <div key={`${name}-${inx}`} className={'tabPanel-row'}>
                              <Input
                                {...register(`${categoryType}-${inx}`, { required: true })}
                                defaultValue={name}
                                placeholder={'이름을 입력하세요'}
                              />
                            </div>
                          );
                        })}
                        {ButtonComp(categoryInx, categoryType)}
                      </div>
                    );
                  })}
                </TabPanels>
              </Tabs>
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
  #name-edit-tab {
    & > div:first-child {
      margin-bottom: 10px;
      button {
        font-weight: bold;
        &:not([aria-selected='true']) {
          opacity: 0.2;
        }
      }
    }
  }
  .tabPanel-row {
    display: flex;
    margin: 5px 0;

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

export default NameEditModal;
