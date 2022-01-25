import { Text } from '@tunadao1/onc-components';
import { useEffect, useState } from 'react';
import { oncService } from '../../services/oncService';
import { convertCurrency } from '../../utils/convertCurrency';
import * as Styles from './styles';

type Payments = {
  length: number;
  total: number;
};

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
}: DonateProps) => {
  const [payments, setPayments] = useState<Payments>({
    length: 0,
    total: 0,
  });

  useEffect(() => {
    const getPayments = async () => {
      const { data, success } = await oncService.getPayments();
      if (success) setPayments(data);
    };
    getPayments();
  }, []);

  return (
    <Styles.DonateWrapper>
      <Styles.Donate type={type}>
        {
          OPTIONS.map(({ value, url }) => (
            <Styles.DonateItem
              href={url}
              target="_blank"
              key={value}
            >
              {
                convertCurrency(value)
              }
            </Styles.DonateItem>
          ))
        }
      </Styles.Donate>
      <Styles.TotalText>
        {`Month's`} donations: <span>{convertCurrency(payments.total)}</span>
      </Styles.TotalText>
    </Styles.DonateWrapper>
  )
}