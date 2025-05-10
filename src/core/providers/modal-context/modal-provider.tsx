import { JSX, ReactNode, useEffect, useState } from 'react';
import { ModalContext } from './modal-context.ts';
import { ModalContextType } from './modal-context.type.ts';
import { ModalType } from '../../models/modal-type.ts';
import {
    MarathonTutorialModal,
} from '../../../features/marathon/components/organisms/marathon-tutorial-modal/marathon-tutorial-modal.tsx';

export function ModalProvider({ children }: { children: ReactNode }) {

    const [modal, setModal] = useState<JSX.Element>();

    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            setModal(undefined);
        });
    }, []);

    function open(type: ModalType) {
        switch (type) {
            case ModalType.MarathonTutorial:
                setModal(<MarathonTutorialModal />);
                break;
        }
    }

    function close() {
        setModal(undefined);
    }

    const context: ModalContextType = {
        open,
        close,
    };

    return <ModalContext.Provider value={context}>
        {modal}
        {children}
    </ModalContext.Provider>;
}