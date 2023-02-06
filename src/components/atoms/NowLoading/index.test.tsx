import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NowLoading } from 'components/atoms/NowLoading';

test('Now Loadingが正常に出力されているか', () => {
  render(<NowLoading />);
  const element = screen.getByText(/Now Loading.../i);
  expect(element).toBeInTheDocument();
});
