import { lighten } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  width: 500px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.sizes.xxs};
  z-index: 99;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(${(props) => props.theme.sizes.xxl} * 2);
  padding: ${(props) => props.theme.sizes.lg};
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.primaryLight};
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${(props) => props.theme.sizes.lg};
  box-sizing: border-box;
`;

export const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.sizes.md} 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryLight};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const ListInfoItemLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.sizes.md};
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => lighten(.3, props.theme.colors.primaryHighlight)};
  width: 100px;
  font-weight: 400;
`;

export const ListInfoItemContent = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.sizes.md};
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.neutral};
  flex: 1;
  font-weight: 300;
  line-height: 1.3;
`;

export const ListInfoItemGroupLabel = styled.label`
  display: flex;
  width: 100%;
  font-size: ${(props) => props.theme.sizes.sm};
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => lighten(.2, props.theme.colors.primaryHighlight)};
  margin: ${(props) => props.theme.sizes.sm} 0;
`;
