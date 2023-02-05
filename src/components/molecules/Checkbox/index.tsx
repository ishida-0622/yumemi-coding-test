export const Checkbox = (props: {
  children?: React.ReactNode;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      {props.children}
    </label>
  );
};
