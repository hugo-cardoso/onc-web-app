import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Aside = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SearchForm = styled.form`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.md };
  position: relative;
`;

export const ProceduresTabs = styled.div`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.md };
`;

export const Filter = styled.div`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.sm };
`;

export const Airport = styled.div`
  width: 100%;
  margin-bottom: ${ (props) => props.theme.sizes.md };
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SearchAutoComplete = styled.div`
  width: 100%;
  height: calc(${ (props) => props.theme.sizes.xxl } * 4);
  background-color: ${ (props) => props.theme.colors.primaryLight };
  position: absolute;
  top: calc(100% + ${ (props) => props.theme.sizes.md });
  left: 0;
  z-index: 3;
  border-radius: ${ (props) => props.theme.sizes.xxs };
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchAutoCompleteItem = styled.div`
  width: 100%;
  height: ${ (props) => props.theme.sizes.xxl };
  min-height: ${ (props) => props.theme.sizes.xxl };
  border-bottom: 1px solid ${ (props) => darken(.05, props.theme.colors.primaryLight) };
  display: flex;
  align-items: center;
  padding: ${ (props) => props.theme.sizes.md };
  box-sizing: border-box;
  cursor: pointer;
  font-family: ${ (props) => props.theme.fonts.primary };
  color: ${ (props) => lighten(.2, props.theme.colors.primaryHighlight) };
  font-size: ${ (props) => props.theme.sizes.sm };
  scroll-snap-align: start;
`;