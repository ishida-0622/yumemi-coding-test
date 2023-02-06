import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from 'components/organisms/Footer';

describe('フッター', () => {
  test('フッターが正常に出力されているか', () => {
    render(<Footer />);
    const element = screen.getByText(/© copyright.Built with Firebase/i);
    expect(element).toBeInTheDocument();
  });

  test('フッターのsmall要素が存在するか', () => {
    const { container } = render(<Footer />);
    expect(container.innerHTML).toMatch(/small/);
  });
});
