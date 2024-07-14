import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchCustomers = async () => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

export const fetchTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};
