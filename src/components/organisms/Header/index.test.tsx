import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from 'components/organisms/Header';

describe('ヘッダー', () => {
  test('ヘッダーが正常に出力されているか', () => {
    render(<Header />);
    const element = screen.getByText(/総人口推移グラフ/i);
    expect(element).toBeInTheDocument();
  });

  test('ヘッダーのH1要素が存在するか', () => {
    render(<Header />);
    const h1Element = screen.getByRole('heading');
    expect(h1Element).toBeInTheDocument();
  });
});
