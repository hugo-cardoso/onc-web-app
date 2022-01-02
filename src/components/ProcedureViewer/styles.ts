import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import type { DrawColor } from './types';

export const Layout = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: minmax(100px, auto) calc(${ (props) => props.theme.sizes.xxl } * 2 + calc(${ (props) => props.theme.sizes.sm } * 3));
  grid-template-rows: repeat(2, 100%);
  position: relative;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .react-pdf__Document,
  .react-pdf__Page {
    width: 100%;
    height: 100%;
  }

  .react-pdf__Document {
    overflow: auto;
    user-select: none;

    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-corner {
      background-color: ${ (props) => props.theme.colors.primaryDark };
    }

    ::-webkit-scrollbar-track {
      background-color: ${ (props) => props.theme.colors.primaryDark };
    }

    ::-webkit-scrollbar-thumb {
      background: ${ (props) => props.theme.colors.primaryLight };
      border-radius: 2px;
    
      &:hover {
        background: ${ (props) => lighten(.05, props.theme.colors.primaryLight) };
      }
    }

    * {
      user-select: none;
    }

    canvas {
      margin: 0 auto;
    }
  }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Toolbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${ (props) => props.theme.sizes.sm };
  box-sizing: border-box;
  border-left: 1px solid ${ (props) => props.theme.colors.primaryLight };
  background-color: ${ (props) => props.theme.colors.primaryDark };
`;

export const ToolbarItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${ (props) => props.theme.sizes.sm };
  margin-bottom: ${ (props) => props.theme.sizes.sm };
`;

type ToolbarItemColorProps = {
  color: DrawColor;
  active?: boolean;
};

export const ToolbarItemColor = styled.div<ToolbarItemColorProps>`
  width: ${ (props) => props.theme.sizes.xxl };
  height: ${ (props) => props.theme.sizes.xxl };
  border-radius: ${ (props) => props.theme.sizes.xxs };
  background-color: ${ (props) => props.color };
  border: 1px solid ${ (props) => props.theme.colors.primaryLight };
  cursor: pointer;
  box-sizing: border-box;

  ${ (props) => props.active && css`
    border-color: ${ (props) => props.theme.colors.neutral };
  `}
`;

export const TextError = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  p {
    margin-bottom: ${ (props) => props.theme.sizes.sm };
  }
`;

export const AdPlaceholder = styled.div`
  width: 100%;
  height: 600px;
  background-color: ${ (props) => props.theme.colors.primary };
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${ (props) => props.theme.sizes.xxs };
`;