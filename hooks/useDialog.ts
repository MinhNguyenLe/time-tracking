import React from "react";

const useDialog = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return { open, onOpen, onClose };
};

export default useDialog;
