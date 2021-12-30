import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Navbar = styled.nav`
  display: flex;
  width: calc(${ (props) => props.theme.sizes.xl } * 2);
  min-width: calc(${ (props) => props.theme.sizes.xl } * 2);
  height: 100%;
  background-color: ${ (props) => props.theme.colors.primaryLight };
  flex-direction: column;
  padding: ${ (props) => props.theme.sizes.xxs };
  box-sizing: border-box;
`;

type NavbarItemProps = {
  active?: boolean;
}

export const NavbarItem = styled.a<NavbarItemProps>`
  display: flex;
  height: calc(${ (props) => props.theme.sizes.xxl } * 2);
  align-items: center;
  justify-content: center;
  color: ${ (props) => props.theme.colors.primaryHighlight };
  border-radius: ${ (props) => props.theme.sizes.xxs };
  text-decoration: none;
  margin-bottom: ${ (props) => props.theme.sizes.xxs };
  cursor: pointer;
  position: relative;

  ${ (props) => props.active && css`
    color: ${ props.theme.colors.neutral };
    background-color: ${ lighten(0.1, props.theme.colors.primaryLight) } !important;
  ` }

  &:hover {
    color: ${ (props) => props.theme.colors.neutral };
    background-color: ${ (props) => lighten(0.05, props.theme.colors.primaryLight) };
  }
`;

export const NavbarItemBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${ (props) => props.theme.sizes.lg };
  height: ${ (props) => props.theme.sizes.lg };
  border-radius: 3px;
  background-color: ${ (props) => props.theme.colors.secondary };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${ (props) => props.theme.sizes.sm };
  font-family: ${ (props) => props.theme.fonts.primary };
  color: ${ (props) => props.theme.colors.neutral };
`;