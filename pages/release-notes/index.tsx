import type { NextPage } from 'next';
import { Text } from '@tunadao1/onc-components';
import { ButtonIcon } from '../../src/components/ButtonIcon';
import { TodoContainer } from '../../src/styles/Global.styles';

const ReleaseNotes: NextPage = () => {
  return (
    <TodoContainer>
      <Text
        text="TODO"
        size="large"
        color="highlight"
      />
      <ButtonIcon
        icon='admin-line'
        disabled
      />
    </TodoContainer>
  )
}

export default ReleaseNotes;
