import styled from "styled-components";

export const HomeContainer = styled.main`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const StartCountDownButton = styled.button`
  border-radius: 8px;
  border: none;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;

  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["gray-100"]};

  &:not(:disabled):hover {
    color: ${(props) => props.theme["green-700"]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
export const StopCountDownButton = styled.button`
  border-radius: 8px;
  border: none;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;

  background: ${(props) => props.theme["red-500"]};
  color: ${(props) => props.theme["gray-100"]};

  &:not(:disabled):hover {
    color: ${(props) => props.theme["red-700"]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
