import { create } from "zustand";

export const useModalStore = create((set) => ({
  modal: null,        // null | "login" | "product" | "cart" etc.
  modalProps: {},

  openModal: (name, props = {}) =>
    set({ modal: name, modalProps: props }),

  closeModal: () =>
    set({ modal: null, modalProps: {} }),


}));
