import * as Styles from './styles';

type DonateProps = {
  type: 'default' | 'aside';
};

const OPTIONS = [
  {
    value: 5,
    url: 'https://mpago.la/2RJgas1',
  },
  {
    value: 15,
    url: 'https://mpago.la/2Q4V9EW',
  },
  {
    value: 10,
    url: 'https://mpago.la/2oQGU5p',
  }
] as {
  value: number;
  url: string;
}[]

export const Donate = ({
  type = 'default',
}: DonateProps) => (
  <Styles.Donate type={type}>
    {
      OPTIONS.map(({ value, url }) => (
        <Styles.DonateItem
          href={url}
          target="_blank"
          key={value}
        >
          {
            (value).toLocaleString('pr-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          }
        </Styles.DonateItem>
      ))
    }
  </Styles.Donate>
)