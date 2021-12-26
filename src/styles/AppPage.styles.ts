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
  padding: ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
`;

export const Sidebar = styled.aside`
  display: flex;
  width: 400px;
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primaryDark };
  padding: ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
`;