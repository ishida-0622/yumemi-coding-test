import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Checkbox } from 'components/molecules/Checkbox';

describe('チェックボックス', () => {
  test('チェックボックスをtrueで初期化できているか', () => {
    render(<Checkbox checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  test('children要素が正常に与えられているか', () => {
    const children = <span>Test</span>;
    render(
      <Checkbox checked={true} onChange={() => {}}>
        {children}
      </Checkbox>
    );
    const childrenElement = screen.getByText(/Test/i);
    expect(childrenElement).toBeInTheDocument();
  });

  test('チェックボックスの切り替えができるか', () => {
    render(<Checkbox checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.change(checkbox, {
      target: { checked: false },
    });
    expect(checkbox).not.toBeChecked();
  });

  test('クリック時にonChangeイベントが発火されるか', () => {
    const onChangeMock = jest.fn();
    render(<Checkbox checked={true} onChange={onChangeMock} />);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
