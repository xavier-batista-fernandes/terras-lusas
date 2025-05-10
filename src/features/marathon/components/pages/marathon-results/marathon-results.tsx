import './marathon-results.css';
import { useMunicipalities } from '../../../../../core/providers/municipalities-context/use-municipalities.ts';
import { useResults } from '../../../hooks/useResults.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { getMarathonHistory } from '../../../utils/get-marathon-history.ts';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { SecondaryButton } from '../../../../../core/components/atoms/buttons/secondary-button/secondary-button.tsx';

export function MarathonResults() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { getDistricts } = useMunicipalities();

    const stats = getMarathonHistory()[Number(id)];
    const {
        getDuration,
        getNumberMunicipalitiesGuessed,
        getNumberMunicipalitiesDiscovered,
        getNumberDistrictsPartiallyCompleted,
        getNumberDistrictsFullyCompleted,
        getMunicipalitiesDiscovered,
    } = useResults(stats);

    const duration = getDuration();
    const numberMunicipalitiesGuessed = getNumberMunicipalitiesGuessed();
    const numberMunicipalitiesDiscovered = getNumberMunicipalitiesDiscovered();
    const numberDistrictsPartiallyCompleted = getNumberDistrictsPartiallyCompleted();
    const numberDistrictsFullyCompleted = getNumberDistrictsFullyCompleted();
    const municipalitiesDiscovered = getMunicipalitiesDiscovered();

    return (
        <div className="marathon-results">
            <header className="header">
                <img
                    src="/assets/icons/receipt-sharp-svgrepo-com.svg"
                    alt="Uma imagem de um relatório com texto escrito."
                />
                <div className="title">
                    <h1>Resultados da Maratona</h1>
                    <p>Um relatório detalhado dos munícipios que escreveste.</p>
                </div>
            </header>
            <p>{format(stats.date, 'd \'de\' MMMM \'de\' yyyy', { locale: pt })}</p>
            <section id="summary">
                <h2>Sumário</h2>
                <div className="summary">
                    <table>
                        <tbody>
                        <tr>
                            <td>Tempo usado</td>
                            <td>{duration}</td>
                        </tr>
                        <tr>
                            <td>Desististe antes do tempo terminar</td>
                            <td>{stats.didQuit ? 'Sim' : 'Não'}</td>
                        </tr>
                        <tr>
                            <td>Municípios certos</td>
                            <td>{numberMunicipalitiesGuessed}</td>
                        </tr>
                        <tr>
                            <td>Municípios descobertos</td>
                            <td>{numberMunicipalitiesDiscovered}</td>
                        </tr>
                        <tr>
                            <td>Distritos abrangidos</td>
                            <td>{numberDistrictsPartiallyCompleted}</td>
                        </tr>
                        <tr>
                            <td>Distritos concluídos</td>
                            <td>{numberDistrictsFullyCompleted}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="municipalities">
                <h2>Municípios</h2>
                <h3>Municípios Descobertos</h3>
                <div className="municipalities">
                    <ul>
                        {municipalitiesDiscovered.map((municipality) => (
                            <li key={municipality.id}>
                                {municipality.municipality}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="districts">
                <h2>Distritos</h2>
                <div className="districts">
                    {getDistricts().map((district) => (
                        <div className="card" key={district}>
                            <h3>{district}</h3>
                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${Math.random() * 100}%` }}
                                />
                            </div>
                            <span>{5}/{12} municípios</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="actions">
                <SecondaryButton isDisabled>Partilhar</SecondaryButton>
                <SecondaryButton onClick={() => navigate('/marathon')}>
                    Sair
                </SecondaryButton>
            </div>
        </div>
    );
}
