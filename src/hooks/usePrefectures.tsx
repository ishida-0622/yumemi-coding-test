import { useEffect, useState } from 'react';
import { PrefectureResultType } from 'types/api';
import { getPrefectures } from 'api/getPrefectures';

/**
 * 都道府県一覧を取得するカスタムフック
 * @returns prefectures: 都道府県一覧 types/api/prefecture.d.ts参照
 * @returns isLoading: 読み込み中か?
 * @returns error: エラーメッセージ
 */
export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<PrefectureResultType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getPrefectures();
        setPrefectures(res);
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
    })();
  }, []);

  return { prefectures, isLoading, error };
};
