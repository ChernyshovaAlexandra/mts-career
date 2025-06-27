import type { FC } from "react";
import { Modal } from "@chernyshovaalexandra/mtsui";
import { useModalStore } from "../../store";

export const ModalRoot: FC = () => {
  const { isOpen, content, close } = useModalStore();

  return (
    <Modal open={isOpen} onClose={close}>
      {content}
    </Modal>
  );
};
