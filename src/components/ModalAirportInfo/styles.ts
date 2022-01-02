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
  height: 500px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.sizes.xxs};
  z-index: 99;
  padding: ${(props) => props.theme.sizes.xl};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;