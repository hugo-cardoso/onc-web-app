import * as Styles from './styles';

type ButtonIconProps = {
  icon: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const ButtonIcon = ({
  icon,
  disabled = false,
  onClick = () => {},
}: ButtonIconProps) => (
  <Styles.Button
    onClick={onClick}
    disabled={disabled}
  >
    <i className={`ri-${ icon }`}></i>
  </Styles.Button>
);