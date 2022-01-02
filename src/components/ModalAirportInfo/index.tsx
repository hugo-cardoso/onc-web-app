import { Button, Text } from '@tunadao1/onc-components';
import { useContext } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import * as Styles from './styles';

export const ModalAirportInfo = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext.airport || !searchContext.showAirportModal) return null;

  return (
    <Styles.Wrapper>
      <Styles.Modal>
        <Text
          text="TODO"
          size="large"
          color='neutral'
        />
        <br />
        <Button
          text="Close"
          color='secondary'
          onClick={() => searchContext.setShowAirportModal(false)}
        />
      </Styles.Modal>
    </Styles.Wrapper>
  )
};