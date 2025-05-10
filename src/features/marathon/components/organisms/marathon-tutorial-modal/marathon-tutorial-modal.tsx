import './marathon-tutorial-modal.css';
import { JSX, useEffect, useRef, useState } from 'react';
import { useModal } from '../../../../../core/providers/modal-context/use-modal.ts';
import { HourglassIcon } from '../../../../../core/components/atoms/icons/hourglass-icon.tsx';
import { FileTrayIcon } from '../../../../../core/components/atoms/icons/file-tray-icon.tsx';
import { CloseCrossIcon } from '../../../../../core/components/atoms/icons/close-cross-icon.tsx';
import { ArrowRightIcon } from '../../../../../core/components/atoms/icons/arrow-right-icon.tsx';

export function MarathonTutorialModal() {

    const dialogRef = useRef<HTMLDialogElement>(null);
    const [page, setPage] = useState(0);
    const { close } = useModal();

    useEffect(() => {
        dialogRef.current?.showModal();
        document.querySelector('body')?.style.setProperty('overflow', 'hidden');
        document.querySelector('.stepper > div[data-step="1"]')?.classList.add('active');

        // TODO: how to animate the backdrop?
        dialogRef.current?.animate({ opacity: 1 }, { duration: 500, fill: 'forwards' });

        return () => {
            document.querySelector('body')?.style.setProperty('overflow', '');
            dialogRef.current?.close();
        };
    }, []);

    // React when a new page is selected
    useEffect(() => {
        const cards = document.querySelector('dialog .content') as HTMLElement;
        cards?.style.setProperty('transform', `translateX(-${page * 100}%)`);

        const activeStep = document.querySelector('dialog .stepper .active') as HTMLElement;
        activeStep.classList.remove('active');

        const stepper = document.querySelector('dialog .stepper') as HTMLElement;
        stepper.children[page].classList.add('active');
    }, [page]);


    const cards: { icon: JSX.Element, title: string, description: string }[] = [
        {
            icon: <HourglassIcon stroke="black" strokeWidth={0} />,
            title: 'O teclado é a tua arma',
            description: 'Tens tempo limitado para escrever nomes de municípios. Escreve todos os que te lembrares. Acentos, traços e cedilhas são ignorados.',
        },
        {
            icon: <FileTrayIcon stroke="black" strokeWidth={0} />,
            title: 'O mapa é o teu guia',
            description: 'À medida que acertas, os municípios aparecem destacados no mapa. Podes navegar pelo mesmo para descobrires quais te faltam.',
        },
        // {
        //     icon: <HourglassIcon stroke="black" strokeWidth={0} />,
        //     title: 'Os distritos contam a tua história',
        //     description: 'No lado direito, tens uma lista com os municípios encontrados, organizados por distrito.',
        // },
        {
            icon: <HourglassIcon stroke="black" strokeWidth={0} />,
            title: 'Os numeros não mentem',
            description: 'Quando o tempo terminar, vais poder ver quantos municípios acertaste e outras estatísticas.',
        },
    ];

    function increaseStep() {
        if (page === cards.length - 1) {
            close();
            return;
        }
        setPage((prev) => prev + 1);
    }

    return (
        <dialog ref={dialogRef}>

            <button className="close-button" onClick={close}><CloseCrossIcon fill="black" strokeWidth={1} /></button>

            <div className="header">
                <h2>Como funcionam as maratonas?</h2>
            </div>

            <div className="content">
                {cards.map((card, index) => {
                    return (
                        <div key={card.title} className="card" data-step={index + 1}>
                            <div className="card-icon">{card.icon}</div>
                            <h1>{card.title}</h1>
                            <p>{card.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="footer">
                <div className="stepper">
                    {cards.map((card, index) =>
                        <div key={card.title} data-step={index + 1}></div>,
                    )}
                </div>
                <button onClick={increaseStep}>
                    {page === cards.length - 1
                        ? 'Ok'
                        : <ArrowRightIcon stroke="black" />
                    }
                </button>
            </div>
        </dialog>
    );
}