import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { InputSizeTypes, InputColors } from './types';

export const FieldLabel = styled.label`
  font-size: ${ (props) => props.theme.sizes.sm };
  color: ${ (props) => props.theme.colors.neutral };
  font-family: ${ (props) => props.theme.fonts.primary };
  font-weight: 400;
  margin-bottom: ${ (props) => props.theme.sizes.xs };
  letter-spacing: .6px;
`;

export const Field = styled.input`
  width: 100%;
  height: ${ (props) => props.theme.sizes.xxl};
  border: 1px solid ${ (props) => props.theme.colors.primaryLight};
  background-color: ${ (props) => props.theme.colors.primaryLight};
  border-radius: ${ (props) => props.theme.sizes.xxs};
  padding: 0 ${ (props) => props.theme.sizes.sm};
  color: ${ (props) => props.theme.colors.neutral};
  font-family: ${ (props) => props.theme.fonts.primary};
  font-weight: 400;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1px solid ${ (props) => props.theme.colors.primaryHighlight };
  }
`;

type Props = {
  size?: InputSizeTypes;
  color?: InputColors;
}

export const Wrapper = styled.div<Props>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  ${ (props) => css`

    ${ Field } {
      ${ props.size === 'small' && css`
        height: ${ props.theme.sizes.xl};
      `}

      ${ props.color === 'dark' && css`
        background-color: ${ darken(0.01, props.theme.colors.primaryDark) };
      `}
    }

  `}
`;