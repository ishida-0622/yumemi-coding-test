export type ResasApiResponseType<T> = {
  message: string | null;
  result: T;
};

// 参考: https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
export type ResasApiFailedResponseType = {
  statusCode: string;
  message: string;
  description: string;
};

export * from 'types/api/prefecture';
export * from 'types/api/population';
