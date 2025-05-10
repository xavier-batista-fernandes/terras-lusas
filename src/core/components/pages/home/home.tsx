import { SecondaryButton } from '../../atoms/buttons/secondary-button/secondary-button';
import './home.css';

import { useNavigate } from 'react-router-dom';


export const Home = () => {
    const navigate = useNavigate();

    function onKnowMore(event: any, text: string) {
        event.stopPropagation();
        alert(text);
    }

    return <div className={'home'}>
        <div className={'content'}>
            <div className="hero">
                <div className={'title'}>
                    <h1>Terras Lusas</h1>
                    <img src="/favicon.svg" alt={'FIXME'} />
                </div>
                <div className="quote">
                    <p>
                        Estas são as <strong>Terras Lusas</strong>.
                        Um jogo para todos aqueles que com toda a confiança disseram:
                    </p>
                    <span>"Ah, isso? Fácil! Fica no distrito de Aveiro, pá. De certeza!"</span>
                    <p>
                        ... e depois afinal é em Beja.
                    </p>
                </div>
            </div>
            <div className="actions">
                <h2>Modos de Jogo</h2>
                <p className="subheading">Preparado para mostrar que sabes mais do que o teu tio nas festas de
                    família?</p>
                <ul>
                    <li role="button" tabIndex={0} onClick={() => navigate('/404')}>
                        <h3>Exploração</h3>
                        <p>Descobre os municípios ao teu ritmo. Navega pelo mapa, aprende onde ficam, e fica a conhecer
                            melhor Portugal.</p>
                        <SecondaryButton onClick={(event) => onKnowMore(event, 'Exploração')}>Saber
                            mais</SecondaryButton>
                    </li>
                    <li role="button" tabIndex={0} onClick={() => navigate('/marathon')}>
                        <h3>Maratona</h3>
                        <p>Escreve o máximo de municípios num tempo limitado. Rápido, divertido e ótimo para testar
                            reflexos geográficos!</p>
                        <SecondaryButton onClick={(event) => onKnowMore(event, 'Maratona')}>Saber mais</SecondaryButton>
                    </li>
                    <li role="button" tabIndex={0} onClick={() => navigate('/404')}>
                        <h3>Diário</h3>
                        <p>Todos os dias um novo desafio para manter a tua pontaria afinada. Bora lá começar o dia com
                            um pouco de geografia!</p>
                        <SecondaryButton onClick={(event) => onKnowMore(event, 'Diário')}>Saber mais</SecondaryButton>
                    </li>
                </ul>

            </div>
        </div>
    </div>;
};