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