import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .react-pdf__Document,
  .react-pdf__Page {
    width: 100%;
    height: 100%;
  }

  .react-pdf__Document {
    overflow: auto;
    user-select: none;

    * {
      user-select: none;
    }

    canvas {
      margin: 0 auto;
    }
  }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;