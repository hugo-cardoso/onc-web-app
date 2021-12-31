import * as Styles from './styles';

type ButtonIconProps = {
  icon: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const ButtonIcon = ({
  icon,
  active = false,
  disabled = false,
  onClick = () => {},
}: ButtonIconProps) => (
  <Styles.Button
    onClick={onClick}
    active={active}
    disabled={disabled}
  >
    <i className={`ri-${ icon }`}></i>
  </Styles.Button>
);