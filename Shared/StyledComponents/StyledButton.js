import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.TouchableOpacity`
  flex-direction: 'row';
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  justify-content: center;
  background: transparent;

  ${(props) =>
    props.primary &&
    css`
      background: #5cb85c;
    `}

  ${(props) =>
    props.secondary &&
    css`
      background: #62b1f6;
    `}

  ${(props) =>
    props.danger &&
    css`
      background: #f40105;
    `}

    ${(props) =>
    props.xlarge &&
    css`
      width: 160px;
    `}

    ${(props) =>
    props.large &&
    css`
      width: 135px;
    `}

    ${(props) =>
    props.medium &&
    css`
      width: 100px;
    `}

    ${(props) =>
    props.small &&
    css`
      width: 40px;
    `}
`;

export default StyledButton;
