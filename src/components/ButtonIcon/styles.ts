import styled from 'styled-components';
import { lighten } from 'polished';

export const Button = styled.button`
  width: ${ (props) => props.theme.sizes.xxl };
  height: ${ (props) => props.theme.sizes.xxl };
  border-radius: ${ (props) => props.theme.sizes.xxs };
  background-color: ${ (props) => props.theme.colors.primary };
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${ (props) => props.theme.colors.primaryLight };
  background-color: ${ (props) => props.theme.colors.primaryLight };
  color: ${ (props) => props.theme.colors.neutral };
  appearance: none;
  font-size: ${ (props) => props.theme.sizes.md };
  cursor: pointer;

  &:hover {
    background-color: ${ (props) => lighten(0.05, props.theme.colors.primaryLight) };
    border-color: ${ (props) => lighten(0.05, props.theme.colors.primaryLight) };
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;