import styled from "styled-components";

export const ActivitiesWrapper = styled.section``;

export const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  gap: 16px;
  margin-top: 24px;

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ActivityCardWrapper = styled.article<{ $bg: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background: ${({ $bg }) =>
    $bg ? `url('${$bg}') no-repeat, #f6f7f9` : "#f6f7f9"};
  background-position: 100% 100%, 0 0;
  background-size: 40%, 100%;
  border-radius: 24px;
  padding: 24px;
  gap: 16px;
  aspect-ratio: 335/360;
  flex-direction: column;
  text-align: left;

  @media (min-width: 420px) {
    aspect-ratio: 335/260;
  }

  @media (min-width: 520px) {
    aspect-ratio: 335/200;
  }
  @media (min-width: 640px) {
    aspect-ratio: 622/280;
  }

  button {
    text-transform: uppercase;
  }
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 640px) {
    p {
      padding-right: 35%;
    }
  }
`;

export const ActivityImage = styled.img`
  width: 96px;
  height: 96px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    align-self: flex-start;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 16px;
`;
