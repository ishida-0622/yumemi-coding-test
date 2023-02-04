// 参考: https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
export type PopulationType = {
  year: number;
  value: number;
};

export type PopulationsType = {
  label: string;
  data: PopulationType[];
};

export type PopulationResultType = {
  boundaryYear: number;
  data: PopulationsType[];
};
