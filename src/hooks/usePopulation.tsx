import { getPopulation } from 'api/getPopulation';
import { useCallback, useRef, useState } from 'react';
import { PrefectureType } from 'types/api';
import { PopulationChartType } from 'types/chart';

/**
 * 都道府県の人口構成を取得してグラフ用に整形するカスタムフック
 * @returns populations: グラフ用に整形された人口構成 types/chart/index.d.ts参照
 * @returns getPopulations: 都道府県の配列を渡すと人口構成を取得する関数
 * @returns isLoading: 読み込み中か?
 * @returns error: エラーメッセージ
 */
export const usePopulation = () => {
  const [populations, setPopulations] = useState<PopulationChartType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const cache = useRef(new Map<number, PopulationChartType>());

  const fetchPopulation = useCallback(
    async (prefCode: number, prefName: string) => {
      // すでに取得済みだった場合は以前取得したものを返す
      if (cache.current.has(prefCode)) {
        return cache.current.get(prefCode)!;
      }

      const res = await getPopulation(prefCode);
      cache.current.set(prefCode, {
        prefCode: prefCode,
        prefName: prefName,
        data: res.data[0].data,
      });

      return {
        prefCode: prefCode,
        prefName: prefName,
        data: res.data[0].data,
      };
    },
    []
  );

  const getPopulations = useCallback(
    async (prefectures: PrefectureType[]) => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          prefectures.map((pref) =>
            fetchPopulation(pref.prefCode, pref.prefName)
          )
        );
        setPopulations(results);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
          setError(e.message);
        } else {
          console.error('Failed to call RESAS API');
          setError('Failed to call RESAS API');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPopulation]
  );

  return { populations, getPopulations, isLoading, error };
};
