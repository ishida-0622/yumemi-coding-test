import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { PopulationChartType } from 'types/chart';

export const Chart = (props: { populations: PopulationChartType[] }) => {
  const prefCodeToColorCode = (n: number) => {
    // 87 ≒ 16^3 / 47
    return '#' + (n * 87).toString(16).padStart(3, '0');
  };

  const options: Highcharts.Options = useMemo(
    (): Highcharts.Options => ({
      title: {
        text: '都道府県人口',
      },
      subtitle: {
        text: 'Source: <a href="https://opendata.resas-portal.go.jp/" target="_blank">RESAS</a>',
        align: 'left',
      },
      series: props.populations.map((pop) => ({
        type: 'line',
        name: pop.prefName,
        data: pop.data.map((val) => val.value),
        color: prefCodeToColorCode(pop.prefCode),
        animation: false,
        marker: {
          symbol: ['circle', 'square', 'diamond', 'triangle', 'triangle-down'][
            pop.prefCode % 5
          ],
        },
      })),
      xAxis: {
        title: {
          text: '年度',
          align: 'high',
        },
        categories:
          props.populations.length > 0
            ? props.populations[0].data.map((val) => val.year.toString())
            : [],
      },
      yAxis: {
        title: {
          text: '人口数',
          align: 'high',
        },
        min: 0,
        softMax: 10 ** 6 * 15,
      },
      chart: {
        animation: false,
      },
    }),
    [props.populations]
  );

  return useMemo(
    () => (
      <>
        {options.series?.length === 0 && <h3>都道府県を選択してください</h3>}
        <HighchartsReact highcharts={Highcharts} options={options} />
      </>
    ),
    [options]
  );
};
