import { Button, Text } from '@tunadao1/onc-components';
import { useContext, useEffect } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import { oncService } from '../../services/oncService';
import { Icao } from '../../types';
import { ButtonIcon } from '../ButtonIcon';
import * as Styles from './styles';

export const ModalAirportInfo = () => {
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    const fetchMetar = (icao: Icao) => {
      oncService.getAirportMetar(icao)
        .then(response => {
          if (response.success) {
            searchContext.setAirportMetar(response.data);
          }
        });
    }

    if (searchContext.airport?.icao) {
      fetchMetar(searchContext.airport.icao);
    }
  }, [searchContext.airport]);

  if (!searchContext.airport || !searchContext.showAirportModal) return null;

  return (
    <Styles.Wrapper>
      <Styles.Modal>
        <Styles.ModalHeader>
          <Text
            text="Airport Info"
            size="large"
            color='neutral'
          />
          <ButtonIcon
            icon="close-line"
            onClick={() => searchContext.setShowAirportModal(false)}
          />
        </Styles.ModalHeader>
        <Styles.ModalContent>
          <Styles.ListInfo>
            <Styles.ListInfoItem>
              <Styles.ListInfoItemLabel>ICAO:</Styles.ListInfoItemLabel>
              <Styles.ListInfoItemContent>{ searchContext.airport?.icao }</Styles.ListInfoItemContent>
            </Styles.ListInfoItem>

            <Styles.ListInfoItem>
              <Styles.ListInfoItemLabel>Name:</Styles.ListInfoItemLabel>
              <Styles.ListInfoItemContent>{ searchContext.airport?.name }</Styles.ListInfoItemContent>
            </Styles.ListInfoItem>

            <Styles.ListInfoItem>
              <Styles.ListInfoItemLabel>Location:</Styles.ListInfoItemLabel>
              <Styles.ListInfoItemContent>{ searchContext.airport?.location?.city } - { searchContext.airport?.location?.state }</Styles.ListInfoItemContent>
            </Styles.ListInfoItem>

            <Styles.ListInfoItem>
              <Styles.ListInfoItemLabel>Metar:</Styles.ListInfoItemLabel>
              <Styles.ListInfoItemContent>{ searchContext.airportMetar }</Styles.ListInfoItemContent>
            </Styles.ListInfoItem>

          </Styles.ListInfo>
          {
            searchContext.airport?.runways.flatMap((rwy: any) => rwy.headboards).length ? (
              <>
                <Styles.ListInfoItemGroupLabel>RUNWAYS</Styles.ListInfoItemGroupLabel>
                <Styles.ListInfo>
                  {
                    searchContext.airport?.runways?.map((runway, index) => (
                      <Styles.ListInfoItem key={index}>
                        <Styles.ListInfoItemLabel>{ runway.ident }:</Styles.ListInfoItemLabel>
                        <Styles.ListInfoItemContent>{ runway.length } x { runway.width } (m)</Styles.ListInfoItemContent>
                      </Styles.ListInfoItem>
                    ))
                  }
                </Styles.ListInfo>
              </>
            ) : null
          }
        </Styles.ModalContent>
      </Styles.Modal>
    </Styles.Wrapper>
  )
};