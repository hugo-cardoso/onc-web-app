import styled, { css } from 'styled-components';
import { lighten } from 'polished';

type DonateItemProps = {
  main?: boolean;
};

export const DonateItem = styled.a<DonateItemProps>`
  width: 100%;
  height: ${ (props) => props.main ? '300px' : '250px' };
  background-color: ${ (props) => props.main ? props.theme.colors.primaryLight : props.theme.colors.primaryDark };
  border: 1px solid ${ (props) => props.main ? lighten(.15, props.theme.colors.primaryDark) : props.theme.colors.primaryLight };
  border-radius: ${ (props) => props.theme.sizes.xxs };
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ (props) => props.theme.colors.neutral };
  font-family: ${ (props) => props.theme.fonts.primary };
  font-size: ${ (props) => props.theme.sizes.lg };
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;

  &:hover {
    border-color: ${ (props) => props.theme.colors.neutral };
  }
`;

type DonateProps = {
  type: 'default' | 'aside';
}

export const Donate = styled.div<DonateProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: ${ (props) => props.theme.sizes.md };

  ${ (props) => props.type === 'aside' && css`
    grid-template-columns: 1fr;

    ${ DonateItem } {
      height: auto;
      padding: ${ (props) => props.theme.sizes.sm };
      box-sizing: border-box;
      font-size: ${ (props) => props.theme.sizes.md };
    }
  `}
`;

export const DonateWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${ (props) => props.theme.sizes.md };
`;

export const TotalText = styled.p`
  font-size: ${ (props) => props.theme.sizes.md };
  font-family: ${ (props) => props.theme.fonts.primary };
  font-weight: 400;
  color: ${ (props) => props.theme.colors.primaryHighlight };
  text-align: center;

  & span {
    color: ${ (props) => props.theme.colors.neutral };
  }
`;