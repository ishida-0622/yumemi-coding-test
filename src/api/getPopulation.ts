import {
  ResasApiResponseType,
  ResasApiFailedResponseType,
  PopulationResultType,
} from 'types/api';
import { populationApi } from 'api/axiosApi';
import { isResasApiFailedResponseType } from 'api/isResasApiFailedResponseType';

/**
 * 都道府県の人口構成を取得する
 * @param prefCode 都道府県コード
 * @returns 人口構成 types/api/population.d.ts参照
 */
export const getPopulation = async (prefCode: number) => {
  const res = await populationApi(prefCode).get<
    ResasApiResponseType<PopulationResultType> | ResasApiFailedResponseType
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
