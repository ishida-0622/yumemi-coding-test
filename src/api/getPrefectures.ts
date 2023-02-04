import {
  ResasApiResponseType,
  ResasApiFailedResponseType,
  PrefectureResultType,
} from 'types/api';
import { prefecturesApi } from 'api/axiosApi';
import { isResasApiFailedResponseType } from 'api/isResasApiFailedResponseType';

/**
 * 都道府県一覧を取得する
 * @returns 都道府県一覧 types/api/prefecture.d.ts参照
 */
export const getPrefectures = async () => {
  const res = await prefecturesApi.get<
    ResasApiResponseType<PrefectureResultType> | ResasApiFailedResponseType
  >('');
  const { data } = res;

  // エラーだった場合は例外を投げる
  if (isResasApiFailedResponseType(data)) {
    if (data.statusCode === '403') {
      throw new Error(`403. ${data.message}`);
    } else if (data.statusCode === '404') {
      throw new Error(data.message);
    } else if (data.statusCode === '429') {
      throw new Error('429. Too many requests');
    } else {
      throw new Error(data.message);
    }
  }

  return data.result;
};
