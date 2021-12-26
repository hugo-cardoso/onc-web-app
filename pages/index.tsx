import type { NextPage } from 'next';
import { Text } from '@tunadao1/onc-components';
import { TodoContainer } from '../src/styles/Global.styles';

const Home: NextPage = () => {
  return (
    <TodoContainer>
      <Text
        text="TODO"
        size="large"
        color="highlight"
      />
    </TodoContainer>
  )
}

export default Home
