import type { NextPage } from 'next';

import { Donate } from '../src/components/Donate';

import * as Styles from '../src/styles/Home.styles';

const Home: NextPage = () => {
  return (
    <Styles.Wrapper>
      <Styles.Hero>
        <Styles.HeroTitle>Open Nav Charts</Styles.HeroTitle>
        <Styles.HeroText>A <span>free</span> online aviation chart viewer for use in flight simulation.</Styles.HeroText>
      </Styles.Hero>
      <Styles.DonateSection>
        <Styles.DonateTitle>Enjoying? Make a donation to the project</Styles.DonateTitle>
        <Styles.DonateCards>
          <Donate type='default'/>
        </Styles.DonateCards>
      </Styles.DonateSection>
    </Styles.Wrapper>
  )
}

export default Home
