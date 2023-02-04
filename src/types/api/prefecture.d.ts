// 参考: https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
export type PrefectureType = {
  prefCode: number;
  prefName: string;
};

export type PrefectureResultType = PrefectureType[];
