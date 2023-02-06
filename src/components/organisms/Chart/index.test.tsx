import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chart } from 'components/organisms/Chart';
import dummy from 'components/organisms/Chart/dummy.json';

describe('グラフ', () => {
  test('空配列を渡した際に選択を促すメッセージが表示されるか', () => {
    render(<Chart populations={[]} />);
    const element = screen.getByText(/都道府県を選択してください/i);
    expect(element).toBeInTheDocument();
  });

  test('ダミーデータを渡した際に正常に出力されているか', () => {
    // ダミーデータの参考: https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
    const dummyData = dummy;
    render(<Chart populations={[dummyData]} />);
    const chartTitle = screen.getByText(/都道府県人口/i);
    const prefName = screen.getByText(/埼玉県/i);
    const populationYear = screen.getByText(/1980/i);
    const svg = screen.getAllByRole('img');
    expect(chartTitle).toBeInTheDocument();
    expect(prefName).toBeInTheDocument();
    expect(populationYear).toBeInTheDocument();
    expect(svg).not.toBeNull();
  });
});
