import React from 'react';
import Link from 'next/link';

import { Customer, Message } from '../../../../models';

import { Dropdown } from '../../../commons';
import {
  Container,
  InfoDiv,
  MenuContainer,
  Menu,
  LogoContainer,
  MessageCounter,
  Text,
  Notif,
  Image,
} from './styledComponents';

interface AdminHeaderProps {
  customers: Customer[];
  selectedCustomer: Customer;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<Message>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  windowWidth: number;
  setResetScroll?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminHeader = (props: AdminHeaderProps): JSX.Element => {
  const { customers, selectedCustomer, setSelectedCustomer, setSelectedMessage, setPage, windowWidth, setResetScroll } =
    props;

  return (
    <Container>
      <MenuContainer>
        <Menu>
          <LogoContainer>
            <Text color="#21B3D3">ADMIN Customers</Text>
            <Link href="/" passHref>
              <Image
                src="/images/logo.svg"
                alt="Wethenew"
                cursor={'pointer'}
                onClick={() => {
                  setSelectedMessage(null);
                  setResetScroll(true);
                }}
              />
            </Link>
          </LogoContainer>
          <MessageCounter>
            <Image src="/images/message-icon-white.svg" alt="message-icon" />
            {<Notif>{selectedCustomer?.unread_messages || '...'}</Notif>}
          </MessageCounter>
        </Menu>
        {customers && customers.length && selectedCustomer && (
          <Dropdown
            items={customers}
            selectedItem={selectedCustomer}
            setSelectedItem={setSelectedCustomer}
            setSelectedMessage={setSelectedMessage}
            setPage={setPage}
            windowWidth={windowWidth}
            setResetScroll={setResetScroll}
          />
        )}
      </MenuContainer>

      <InfoDiv>
        <Text color="white">Gestion des messages clients</Text>
      </InfoDiv>
    </Container>
  );
};
