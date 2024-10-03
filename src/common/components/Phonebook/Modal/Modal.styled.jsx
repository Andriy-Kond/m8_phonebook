import styled from "@emotion/styled";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const ModalWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);

  min-height: 300px;
  max-width: 600px;
  padding: 12px;
  width: 100%;

  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Button = styled.button``;
export { Backdrop, ModalWindow, Button };
