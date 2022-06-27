import styled from "styled-components";

const StyledRow = styled.tr`
  .left-align {
    display: flex;
    justify-content: flex-start;
    position: relative;
    background: var(--white1);
  }
  & td {
    height: 68px;
    padding: 0;

    div.table-cell {
      box-shadow: 0 3px 6px rgb(0 0 0 / 10%), 0 10px 20px rgb(0 0 0 / 15%);
    }
    div.table-value {
      display: flex;
      position: relative;
      z-index: 1;
      align-items: center;
      justify-content: center;
      height: 54px;
      background: var(--white1);
      overflow: hidden;
      white-space: nowrap;
      transition: all 0.3s;
    }

    &:first-child div {
      justify-content: flex-start;
      border-radius: 4px 0 0 4px;
    }
    &:last-child div {
      border-radius: 0 4px 4px 0;
    }
  }

  &:hover td div.table-value {
    transform: scale(1.02);
    position: relative;
    z-index: 1;
  }
`;

export const components = {
  body: {
    row: StyledRow,
  },
};
