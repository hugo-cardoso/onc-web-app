import styled from 'styled-components';

export const Aside = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Tabs = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.sizes.md};
`;