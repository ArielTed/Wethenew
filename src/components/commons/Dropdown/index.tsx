import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { ControlContainer, Avatar, Text, Image, DropdownMenu, DropdownRow } from './styledComponents';

interface DropdownProps {
  items: Array<any>;
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  setSelectedMessage?: React.Dispatch<React.SetStateAction<any>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  windowWidth?: number;
  setResetScroll?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Dropdown = (props: DropdownProps): JSX.Element => {
  const { items, selectedItem, setSelectedItem, setSelectedMessage, setPage, windowWidth, setResetScroll } = props;

  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const handleControlClick = () => {
    if (!selectedItem) return;

    setIsActive((prevState) => !prevState);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setSelectedMessage(null);
    setPage(2);
    setIsActive(false);
    setResetScroll(true);
    router.push('/');
  };

  return (
    <div>
      <ControlContainer onClick={handleControlClick} isActive={isActive}>
        <Avatar src={selectedItem.avatar} alt="avatar" />
        {windowWidth > 415 && <Text color={'white'}>{selectedItem.name}</Text>}
        <Image src="/images/chevron-down.svg" alt="chevron" isActive={isActive} style={{ margin: '0 0.7rem' }} />
      </ControlContainer>
      <DropdownMenu isActive={isActive}>
        {items.map((item) => (
          <DropdownRow key={item.id} onClick={() => handleItemClick(item)}>
            <Avatar src={item.avatar} alt="avatar" />
            <Text color={'black'}>{item.name}</Text>
          </DropdownRow>
        ))}
      </DropdownMenu>
    </div>
  );
};
