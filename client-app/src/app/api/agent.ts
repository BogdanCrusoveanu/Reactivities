import axios, { AxiosResponse } from 'axios';
import { IActivity } from './../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const reqests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => reqests.get('/activities'),
  details: (id: string) => reqests.get(`/activities/${id}`),
  create: (activity: IActivity) => reqests.post('/activities', activity),
  update: (activity: IActivity) =>
    reqests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => reqests.delete(`/activities/${id}`),
};

export default Activities;
