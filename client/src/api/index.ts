import axios from 'axios';
import { UserCredentials } from '../models/interfaces';
import { ChatRequest } from '../models/types';

const BASE_URL = 'https://gat-gpt-5wee52lw2a-uc.a.run.app/api';
// const BASE_URL = 'https://localhost:8080/api';

// USER FUNCTIONS
export const registerUser = async (userInputs: UserCredentials) => {
  if (!userInputs.email || !userInputs.password) {
    return { error: 'Missing email or password' };
  } else {
    const response = await axios.post(`${BASE_URL}/users/register`, userInputs);

    if (response.data.error) {
      console.log(response.data.error);
      return response.data;
    }
    return response.data.user;
  }
};

export const loginUser = async (userInputs: UserCredentials) => {
  if (!userInputs.email || !userInputs.password) {
    return { error: 'Missing email or password' };
  } else {
    const response = await axios.post(`${BASE_URL}/users/login`, userInputs);

    if (response.data.error) {
      console.log(response.data.error);
      return response.data;
    }
    return response.data.user;
  }
};

export const verifyGoogleAuth = async () => {
  console.log('in verify google auth function');
  const response = await axios.get(`${BASE_URL}/users/auth/google`);
  if (response.data.error) {
    console.log(response.data.error);
    return response.data;
  }
  return response.data.user;
};

export const fetchUserById = async (userId: string) => {
  if (!userId) {
    return { error: 'Invalid ID Provided' };
  } else {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);

    if (response.data.error) {
      console.log(response.data.error);
      return response.data;
    }
    return response.data.user;
  }
};

export const fetchTokensByUserId = async (userId: number) => {
  if (!userId) {
    return { error: 'Invalid ID Provided' };
  } else {
    const response = await axios.get(`${BASE_URL}/tokens/${userId}`);

    if (response.data.error) {
      console.log(response.data.error);
      return response.data;
    }
    return response.data.availableTokens;
  }
};

export const removeTokensByUserId = async (userId: number, amount = 1) => {
  const body = {
    userId,
    amount
  };
  if (!userId) {
    return { error: 'Invalid ID Provided' };
  } else {
    const response = await axios.post(`${BASE_URL}/tokens/subtract`, body);

    if (response.data.error) {
      console.log(response.data.error);
      return response.data;
    }
    return response.data.remainingTokens;
  }
};

export const refreshTokensByUserId = async (userId: number) => {
  if (!userId) {
    return { error: 'Invalid ID Provided' };
  } else {
    const response = await axios.post(`${BASE_URL}/tokens/add`, { userId });

    if (response.data.error) {
      console.log(response.data.error);
      return response.data;
    }
    console.log(response.data);
    return response.data;
  }
};

// CHAT REQUEST FUNCTIONS

export const createChatRequest = async (request: ChatRequest) => {
  if (!request[1]) {
    return { error: 'Invalid Request, Try Again' };
  } else {
    const response: any = await axios.post(
      `${BASE_URL}/messages/send`,
      request
    );
    if (!response) return 'Unknown Error, Try Again';
    return response;
  }
};
