import type { FC } from "react";
import { Modal } from "@chernyshovaalexandra/mtsui";
import { useModalStore } from "../../store";

export const ModalRoot: FC = () => {
  const { isOpen, content, close } = useModalStore();

  return (
    <Modal isModalOpen={isOpen} handleClose={close}>
      {content}
    </Modal>
  );
};
