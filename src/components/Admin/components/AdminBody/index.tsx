import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/fr';

import { Customer, Message } from '../../../../models';
import { customerService } from '../../../../services';

import { List } from '../../../commons';
import {
  Container,
  LoaderContainer,
  MessageContainer,
  MessageBloc,
  Title,
  SubTitle,
  MessageInfos,
  Body,
  Icon,
  Button,
} from './styledComponents';

import Loader from 'react-loader-spinner';

interface AdminBodyProps {
  selectedCustomer: Customer;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  selectedMessage: Message;
  setSelectedMessage: React.Dispatch<React.SetStateAction<Message>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  windowWidth: number;
  resetScroll: boolean;
  setResetScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const getMessages = async (customer: Customer, page = 1, pageSize = 20) => {
  try {
    const messages = await customerService.getCustomerMessages(customer.id, page, pageSize);

    return messages;
  } catch (err) {
    console.log(err);
  }
};

const getMessage = async (customer: Customer, messageId: number) => {
  try {
    const message = await customerService.getMessageById(customer.id, messageId);

    return message;
  } catch (err) {
    console.log(err);
  }
};

const updateMessage = async (customer: Customer, message: Message) => {
  try {
    await customerService.updateMessage(customer.id, message);
  } catch (err) {
    console.log(err);
  }
};

export const AdminBody = (props: AdminBodyProps): JSX.Element => {
  const {
    selectedCustomer,
    setCustomers,
    messages,
    setMessages,
    selectedMessage,
    setSelectedMessage,
    page,
    setPage,
    windowWidth,
    resetScroll,
    setResetScroll,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const getIcon = (item: any) => {
    if (item.type === 'phone') return '/images/phone-icon-black.svg';
    else return '/images/message-icon-black.svg';
  };

  const getMoreMessages = async () => {
    const fetchedMessages = await getMessages(selectedCustomer, page);

    setPage((prevState) => prevState + 1);

    return fetchedMessages;
  };

  const handleClick = () => {
    setSelectedMessage(null);
    router.push('/');
  };

  useEffect(() => {
    if (Number.isNaN(router.query.messageId) || !selectedCustomer) return;

    const queryMessage = messages.find((message) => message.id === Number(router.query.messageId));

    if (queryMessage) setSelectedMessage(queryMessage);
    else {
      (async () => {
        const fetchedMessage = await getMessage(selectedCustomer, Number(router.query.messageId));

        if (fetchedMessage) setSelectedMessage(fetchedMessage);
      })();
    }
  }, [messages, router.query.messageId]);

  useEffect(() => {
    if (!selectedCustomer || page > 2) return;

    (async () => {
      const fetchedMessages = await getMessages(selectedCustomer);
      setMessages(fetchedMessages);
      setPage(2);
      setIsLoading(false);
    })();
  }, [selectedCustomer]);

  useEffect(() => {
    if (!selectedMessage || selectedMessage.read) return;

    (async () => {
      const updatedMessage = { ...selectedMessage, read: true };

      await updateMessage(selectedCustomer, updatedMessage);

      setCustomers((prevState) => {
        const updatedCustomers = [...prevState];

        updatedCustomers[updatedCustomers.indexOf(selectedCustomer)] = {
          ...selectedCustomer,
          unread_messages: selectedCustomer.unread_messages - 1,
        };

        return updatedCustomers;
      });

      if (messages.indexOf(selectedMessage) === -1) return;

      setMessages((prevState) => {
        const updatedMessages = [...prevState];

        updatedMessages[updatedMessages.indexOf(selectedMessage)] = updatedMessage;

        return updatedMessages;
      });
    })();
  }, [selectedMessage]);

  useEffect(() => {
    if (!messages.length || !selectedMessage) return;

    setSelectedMessage((prevState) => messages.find((message) => message.id === prevState.id));
  }, [messages]);

  return isLoading ? (
    <LoaderContainer>
      <Loader type="TailSpin" color="black" height={50} width={50} />
    </LoaderContainer>
  ) : (
    <Container>
      {(!selectedMessage || windowWidth > 415) && (
        <div style={{ width: `${windowWidth > 415 ? '38rem' : '100%'}` }}>
          <List
            items={messages}
            setItems={setMessages}
            selectedItem={selectedMessage}
            setSelectedItem={setSelectedMessage}
            getItems={getMoreMessages}
            router={router}
            resetScroll={resetScroll}
            setResetScroll={setResetScroll}
          />
        </div>
      )}
      {selectedMessage && (
        <MessageContainer>
          <MessageBloc>
            <Title>{`${selectedMessage.contact.firstname} ${selectedMessage.contact.lastname}`}</Title>
            <SubTitle>{selectedMessage.contact.email}</SubTitle>
            <SubTitle color={'#21B3D3'}>{selectedMessage.contact.phone}</SubTitle>
          </MessageBloc>
          <MessageBloc flex={1}>
            <MessageInfos>
              <Icon src={getIcon(selectedMessage)} alt={selectedMessage.type} />
              <Title>{`${selectedMessage.contact.firstname} ${selectedMessage.contact.lastname}`}</Title>
              <SubTitle>{selectedMessage.contact.email}</SubTitle>
              <SubTitle color={'#8A8989'}>
                {moment(selectedMessage.date).format('dddd DD MMMM HH:mm').charAt(0).toUpperCase() +
                  moment(selectedMessage.date).format('dddd DD MMMM HH:mm').slice(1)}
              </SubTitle>
            </MessageInfos>
            <Body>{selectedMessage.body}</Body>
          </MessageBloc>
          {windowWidth <= 415 && <Button onClick={handleClick}>Revenir à la liste</Button>}
        </MessageContainer>
      )}
    </Container>
  );
};
