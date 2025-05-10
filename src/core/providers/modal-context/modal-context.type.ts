import { ModalType } from '../../models/modal-type.ts';

export interface ModalContextType {
    open: (modalType: ModalType) => void;
    close: () => void;
}