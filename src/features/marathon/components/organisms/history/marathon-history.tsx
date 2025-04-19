import './marathon-history.css';
import { HomeButton } from '../../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { getMarathonHistory } from '../../../utils/get-marathon-history.ts';
import { durationToString } from '../../../../../core/utils/duration-to-string.ts';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

export function MarathonHistory() {
    const navigate = useNavigate();
    const history = getMarathonHistory();
    const isEmpty = history.length === 0;


    function onClick(id: number) {
        console.log('Clicked on marathon', id);
        navigate(`/marathon/results/${id}`);
    }

    return (
        <div className="marathon-history">
            <div className="header">
                <img src="/assets/icons/file-tray-stacked-sharp-svgrepo-com.svg" alt="FIXME" />
                <div className="title">
                    <h1>Histórico de Maratonas</h1>
                    <p>Recorda todas as maratonas que já jogaste.</p>
                </div>

            </div>

            {isEmpty &&
                <div className="empty-content">
                    <img src="/assets/icons/search-sharp-svgrepo-com.svg"
                         alt="Uma imagem de um gráfico de barras, simbolizando estatísticas." />
                    <div className="title">
                        <h2>Ainda não existem dados</h2>
                        <p>Joga pelo menos uma vez para veres o histórico.</p>
                    </div>
                </div>
            }

            {!isEmpty &&
                <div className="not-empty-container">
                    {history.map((marathon, index) => (
                        <div className="card" key={index} onClick={() => onClick(index)}>
                            <h2>{`Maratona #${index + 1}`}</h2>
                            <p>{format(marathon.date, 'd \'de\' MMMM \'de\' yyyy', { locale: pt })}</p>
                            <div>{durationToString(marathon.duration)}</div>
                            <img src="/assets/icons/chevron-down-sharp-svgrepo-com.svg"
                                 alt="A chevron arrow pointing downwards." />
                        </div>
                    ))}
                </div>}

            <div className="actions">
                <HomeButton onClick={() => navigate('/marathon')}>
                    Voltar
                </HomeButton>
            </div>
        </div>
    );
}
