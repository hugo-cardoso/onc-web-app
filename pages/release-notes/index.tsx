import type { NextPage } from 'next';
import { Text } from '@tunadao1/onc-components';
import { TodoContainer } from '../../src/styles/Global.styles';
import Head from 'next/head';

const ReleaseNotes: NextPage = () => {
  return (
    <>
      <Head>
        <title>Open Nav Charts - Release Notes</title>
      </Head>
      <TodoContainer>
        <Text
          text="TODO"
          size="large"
          color="highlight"
        />
      </TodoContainer>
    </>
  )
}

export default ReleaseNotes;
