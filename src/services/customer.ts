import axios from 'axios';

import { Message } from '../models';

const baseUrl = 'http://localhost:8080/customers';

const getCustomers = () => {
  return axios
    .get(baseUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getCustomerMessages = (customerId: number, page?: number, pageSize?: number, sort = 'date:desc') => {
  let url = `${baseUrl}/${customerId}/messages/?sort=${sort}`;

  if (page) url = url + `&page=${page}`;
  if (pageSize) url = url + `&page_size=${pageSize}`;

  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getMessageById = (customerId: number, messageId: number) => {
  return axios
    .get(`${baseUrl}/${customerId}/messages/${messageId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const updateMessage = (customerId: number, message: Message) => {
  const { id, ...rest } = message;

  return axios
    .patch(`${baseUrl}/${customerId}/messages/${id}`, rest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const customerService = { getCustomers, getCustomerMessages, getMessageById, updateMessage };
