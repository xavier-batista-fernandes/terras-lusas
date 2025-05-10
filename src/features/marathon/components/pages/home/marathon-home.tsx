import './marathon-home.css';
import { useModal } from '../../../../../core/providers/modal-context/use-modal.ts';
import { ModalType } from '../../../../../core/models/modal-type.ts';
import { PrimaryButton } from '../../../../../core/components/atoms/buttons/primary-button/primary-button.tsx';
import { SecondaryButton } from '../../../../../core/components/atoms/buttons/secondary-button/secondary-button.tsx';
import { useState } from 'react';
import { MarathonPlay } from '../../organisms/play/marathon-play.tsx';

export function MarathonHome() {

    const { open } = useModal();

    const [isPlaying, setIsPlaying] = useState(false);


    function onStartClick() {
        setIsPlaying(true);
    }

    function openKnowMore() {
        open(ModalType.MarathonTutorial);
    }

    // TODO: convert these navigation buttons to link anchors for a11y.
    return (
        <>
            {isPlaying ? <MarathonPlay /> :
                <div className="marathon-home-container">
                    <div className="hero">
                        <div>
                            <p>TERRAS LUSAS</p>
                            <h1>Maratona de Municípios</h1>
                            <p>
                                Um jogo onde <strong>o tempo voa </strong> e os teus conhecimentos
                                sobre <strong>a geografia lusitana</strong> são postos à prova.
                            </p>
                            <div>
                                <PrimaryButton onClick={onStartClick}>
                                    Jogar
                                </PrimaryButton>
                                <SecondaryButton onClick={openKnowMore}>
                                    Aprende as regras da Maratona
                                </SecondaryButton>
                            </div>
                        </div>

                        <img src="/assets/icons/maps-and-flags-circle-svgrepo-com.svg"
                             alt="Maratona de Municípios" />

                    </div>

                    <div className="cards">
                        <a href="/marathon/statistics">
                            <img src="/assets/icons/bar-chart-sharp-svgrepo-com.svg"
                                 alt="Uma imagem de um gráfico de barras." />
                            <div>
                                <h2>Estatísticas</h2>
                                <p>Acompanha o teu progresso e troféus das várias maratonas.</p>
                            </div>
                        </a>
                        <a href="/marathon/history">
                            <img src="/assets/icons/file-tray-stacked-sharp-svgrepo-com.svg"
                                 alt="Uma imagem de um gráfico de barras." />
                            <div>
                                <h2>Histórico</h2>
                                <p>Recorda todas as maratonas que já jogaste.</p>
                            </div>
                        </a>
                    </div>

                    <div className="faq"></div>
                </div>
            }
        </>
    );
}