import axios from 'axios';
import { UserCredentials } from '../models/interfaces';
import { ChatRequest } from '../models/types';

const BASE_URL = 'http://localhost:8080/api/chat-app';
// const BASE_URL = 'https://open-ai-server.uc.r.appspot.com/api/chat-app';

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

export const fetchUserById = async (userId: number) => {
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
    console.log(response);
    if (!response) return 'Unknown Error, Try Again';
    return response;
  }
};
