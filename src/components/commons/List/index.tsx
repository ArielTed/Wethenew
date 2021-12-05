/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/ban-types */
import React, { useEffect } from 'react';
import { NextRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/fr';

import { Container, Item, Title, SubTitle, Text, Icon, Date } from './styledComponents';

interface ListProps {
  items: Array<any>;
  setItems: React.Dispatch<React.SetStateAction<any>>;
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  getItems?: Function;
  router?: NextRouter;
  resetScroll?: boolean;
  setResetScroll?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const List = (props: ListProps): JSX.Element => {
  const { items, setItems, selectedItem, setSelectedItem, getItems, router, resetScroll, setResetScroll } = props;

  const handleClick = (item: any) => {
    setSelectedItem(item);
    router.push(`/?messageId=${item.id}`, undefined, { shallow: true });
  };

  const handleScroll = async (e: any) => {
    if (resetScroll) {
      e.target.scrollTo(0, 0);
      setResetScroll(false);
    }

    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      const fetchedItems = await getItems();
      // @ts-ignore
      setItems((prevState) => {
        return [...prevState, ...fetchedItems];
      });
    }
  };

  const getIcon = (item: any) => {
    if (item.read) {
      if (item.type === 'phone') return '/images/phone-icon-grey.svg';
      else return '/images/message-icon-grey.svg';
    } else {
      if (item.type === 'phone') return '/images/phone-icon-black.svg';
      else return '/images/message-icon-black.svg';
    }
  };

  const getDate = (item: any) => {
    if (moment().isSame(moment(item.date), 'day')) return moment(item.date).format('HH:MM');

    if (moment().isSame(moment(item.date), 'month')) {
      if (moment().date() - moment(item.date).date() === 1) return 'Hier';

      if (moment().date() - moment(item.date).date() === 2) {
        const date = moment(item.date).format('dddd');

        return date.charAt(0).toUpperCase() + date.slice(1);
      }

      return moment(item.date).format('DD/M/YYYY');
    }

    return moment(item.date).format('DD/M/YYYY');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container onScroll={handleScroll}>
      {items &&
        items.map((item) => (
          <Item key={item.id} onClick={() => handleClick(item)} isActive={selectedItem && item.id === selectedItem.id}>
            <Icon src={getIcon(item)} alt={item.type} />
            <Title isRead={item.read}>{`${item.contact.firstname} ${item.contact.lastname}`}</Title>
            <SubTitle isRead={item.read}>
              {item.type === 'phone'
                ? 'Appel téléphonique depuis Service clients WTN'
                : item.type === 'sms'
                ? 'SMS depuis Service clients WTN'
                : 'Message envoyé depuis wethenew.com'}
            </SubTitle>
            <Text>{item.type === 'phone' ? 'Durée appel : x min xx sec.' : item.body}</Text>
            <Date isRead={item.read}>{getDate(item)}</Date>
          </Item>
        ))}
    </Container>
  );
};
