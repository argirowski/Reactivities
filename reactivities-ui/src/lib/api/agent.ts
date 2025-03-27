import axios from "axios";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const agent = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

agent.interceptors.response.use(async (response) => {
  await sleep(1000);
  return response;
});

export default agent;
