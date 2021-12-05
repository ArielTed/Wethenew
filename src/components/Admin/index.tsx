import React, { useState, useEffect } from 'react';

import { Customer, Message } from '../../models';
import { customerService } from '../../services';

import { AdminBody, AdminHeader } from './components';
import { Container } from './styledComponents';

const getCustomers = async () => {
  try {
    const customers = await customerService.getCustomers();

    return customers;
  } catch (err) {
    console.log(err);
  }
};

export const Admin = (): JSX.Element => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message>(null);
  const [page, setPage] = useState(2);
  const [resetScroll, setResetScroll] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);
    })();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!customers.length) return;

    if (!selectedCustomer) setSelectedCustomer(customers[0]);

    setSelectedCustomer((prevState) => customers.find((customer) => customer.id === prevState.id));
  }, [customers]);

  return (
    <Container>
      <AdminHeader
        customers={customers}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        setSelectedMessage={setSelectedMessage}
        setPage={setPage}
        windowWidth={windowWidth}
        setResetScroll={setResetScroll}
      />
      <AdminBody
        selectedCustomer={selectedCustomer}
        setCustomers={setCustomers}
        messages={messages}
        setMessages={setMessages}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        page={page}
        setPage={setPage}
        windowWidth={windowWidth}
        resetScroll={resetScroll}
        setResetScroll={setResetScroll}
      />
    </Container>
  );
};
