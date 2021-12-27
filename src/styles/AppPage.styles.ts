import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primary };
`;

export const Content = styled.section`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  display: flex;
  min-width: 400px;
  width: 400px;
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primaryDark };
  padding: ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
`;