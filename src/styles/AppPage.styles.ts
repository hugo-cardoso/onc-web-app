import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primary };
`;

export const Content = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primaryDark };
  padding: ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
  border-right: 1px solid ${ (props) => props.theme.colors.primaryLight };
`;