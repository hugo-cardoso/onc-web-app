import styled, { css } from "styled-components";

export const Sidebar = styled.aside`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primaryDark};
  padding: ${(props) => props.theme.sizes.md};
  box-sizing: border-box;
  border-right: 1px solid ${(props) => props.theme.colors.primaryLight};
`;

export const Wrapper = styled.div<{
  isFull?: boolean;
}>`
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary};

  ${(props) =>
    props.isFull &&
    css`
      grid-template-columns: 1fr;

      ${Sidebar} {
        display: none;
      }
    `}
`;

export const Content = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const BtnToggleSidebar = styled.div`
  position: absolute;
  top: ${ (props) => props.theme.sizes.sm };
  left: ${ (props) => props.theme.sizes.sm };
  z-index: 11;
`;
