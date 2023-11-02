"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  button,
  useDisclosure,
} from "@nextui-org/react";

interface Props {
  title: string;
  text: string;
  button1: string;
  icon?: string;
  onClick: any;
}

const ModalComponent = ({ title, text, button1, icon, onClick }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const closeModal = onClose;

  return (
    <>
      <Button
        className="bg-default-white hover:text-primary bg-opacity-0"
        isIconOnly
        onPress={onOpen}
      >
        <i className={`bi bi-${icon} text-xl`}></i>
      </Button>
      <Modal
        isDismissable={false}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col text-center gap-1 outline-none">
                {title}
              </ModalHeader>
              <ModalBody>
                <div>
                  <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                    {text}
                  </p>
                </div>
              </ModalBody>
              <div className="flex items-center pb-3 justify-center text-center">
                <div className="mt-2">
                  <button
                    onClick={onClick}
                    type="button"
                    className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                  >
                    {button1}
                  </button>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    className="inline-flex font-base hover:font-bold outline-none border-none transition-all ml-7 justify-center rounded-lg px-4 py-2 text-lg"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
