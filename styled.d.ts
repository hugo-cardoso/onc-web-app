import 'styled-components';
import { Theme } from '@tunadao1/onc-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}