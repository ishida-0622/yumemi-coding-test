import axios from 'axios';

export const prefecturesApi = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/api/v1/prefectures',
  headers: {
    'X-API-KEY': process.env.REACT_APP_API_KEY,
  },
});

export const populationApi = (prefCode: number) =>
  axios.create({
    baseURL: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    headers: {
      'X-API-KEY': process.env.REACT_APP_API_KEY,
    },
  });
