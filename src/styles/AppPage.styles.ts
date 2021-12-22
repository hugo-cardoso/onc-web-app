import styled, { css } from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${ (props) => props.theme.colors.primary };
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0 ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
`;

export const Sidebar = styled.aside`
  display: flex;
  width: 500px;
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primaryLight };
`;

export const SidebarNav = styled.nav`
  display: flex;
  width: calc(${ (props) => props.theme.sizes.xl } * 2);
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primaryLight };
  flex-direction: column;
`;

type SidebarNavItemProps = {
  active?: boolean;
}

export const SidebarNavItem = styled.a<SidebarNavItemProps>`
  display: flex;
  height: calc(${ (props) => props.theme.sizes.xxl } * 2);
  align-items: center;
  justify-content: center;
  color: ${ (props) => props.theme.colors.primaryHighlight };
  border-radius: ${ (props) => props.theme.sizes.xxs };

  ${ (props) => props.active && css`
    color: ${ props.theme.colors.neutral };
  ` }
`;

export const SearchProcedure = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${ (props) => props.theme.colors.primaryDark };
  padding: ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
`;

export const SearchProcedureForm = styled.form`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.md };
`;

export const SearchProcedureTabs = styled.div`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.md };
`;

export const SearchProcedureFilter = styled.div`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.sm };
`;

export const SearchAirport = styled.div`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.md };
`;