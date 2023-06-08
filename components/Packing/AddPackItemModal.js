import React from "react";

import { Modal } from "../Modal";

const AddPackItemModal = ({ onShow, onClose }) => {
  return (
    <Modal onShow={onShow} onClose={onClose}>
      <h1>Packing List</h1>
    </Modal>
  );
};

export default AddPackItemModal;
