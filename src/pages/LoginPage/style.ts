import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Form = styled.form`
  background-color: #f2f3f7;
  width: 446px;
  max-width: 100%;
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 16px;
  margin: 0 auto;

  > div {
    width: 100%;
    input,
    button {
      width: 100%;
      max-width: 100%;
    }
  }
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-direction: column;
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #ff0032;
  font-size: 14px;
  cursor: pointer;
`;
