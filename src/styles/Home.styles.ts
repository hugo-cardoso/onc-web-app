import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
`;

export const Hero = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${ (props) => props.theme.colors.primaryDark };
  border: 1px solid ${ (props) => props.theme.colors.primaryLight };
  border-radius: ${ (props) => props.theme.sizes.xxs };
  padding: ${ (props) => props.theme.sizes.xxl };
  box-sizing: border-box;
  margin-bottom: ${ (props) => props.theme.sizes.xl };
`;

export const HeroTitle = styled.h1`
  color: ${ (props) => props.theme.colors.neutral };
  font-family: ${ (props) => props.theme.fonts.primary };
  font-size: ${ (props) => props.theme.sizes.xxl };
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: ${ (props) => props.theme.sizes.lg };
`;

export const HeroText = styled.p`
  color: ${ (props) => props.theme.colors.primaryHighlight };
  font-family: ${ (props) => props.theme.fonts.primary };
  font-size: ${ (props) => props.theme.sizes.lg };
  font-weight: 400;
  letter-spacing: 1px;
  text-align: center;
  line-height: 1.3;

  & > span {
    color: ${ (props) => props.theme.colors.neutral };
  }
`;

export const DonateSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DonateTitle = styled.h2`
  color: ${ (props) => props.theme.colors.neutral };
  font-family: ${ (props) => props.theme.fonts.primary };
  font-size: ${ (props) => props.theme.sizes.lg };
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: ${ (props) => props.theme.sizes.xl };
`;

export const DonateCards = styled.div`
  width: 600px;
`;