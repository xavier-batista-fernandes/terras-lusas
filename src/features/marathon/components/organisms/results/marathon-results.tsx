import './marathon-results.css';
import { HomeButton } from '../../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { useMunicipalities } from '../../../../../core/providers/municipalities-context/use-municipalities.ts';
import { getLastMarathon } from '../../../utils/get-last-marathon.ts';
import { useResults } from '../../../hooks/useResults.ts';
import { useNavigate } from 'react-router-dom';

// TODO: make this page use an id to get the marathon results (id of the marathon?)
export function MarathonResults() {
    const navigate = useNavigate();
    const { getDistricts } = useMunicipalities();
    const {
        getDuration,
        getNumberMunicipalitiesGuessed,
        getNumberMunicipalitiesDiscovered,
        getNumberDistrictsPartiallyCompleted,
        getNumberDistrictsFullyCompleted,
        getMunicipalitiesDiscovered,
    } = useResults(getLastMarathon());

    const duration = getDuration();
    const numberMunicipalitiesGuessed = getNumberMunicipalitiesGuessed();
    const numberMunicipalitiesDiscovered = getNumberMunicipalitiesDiscovered();
    const numberDistrictsPartiallyCompleted = getNumberDistrictsPartiallyCompleted();
    const numberDistrictsFullyCompleted = getNumberDistrictsFullyCompleted();
    const municipalitiesDiscovered = getMunicipalitiesDiscovered();

    if (false) {
        console.log('lastMarathon', getLastMarathon());
        console.log('duration', duration);
        console.log('numberMunicipalitiesGuessed', numberMunicipalitiesGuessed);
        console.log('numberMunicipalitiesDiscovered', numberMunicipalitiesDiscovered);
        console.log('numberDistrictsPartiallyCompleted', numberDistrictsPartiallyCompleted);
        console.log('numberDistrictsFullyCompleted', numberDistrictsFullyCompleted);
        console.log('municipalitiesDiscovered', municipalitiesDiscovered);
    }

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
                <div className="municipalities">
                    <h3>Municípios Descobertos</h3>
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
                <HomeButton isDisabled>Partilhar</HomeButton>
                <HomeButton onClick={() => navigate('/marathon')}>
                    Sair
                </HomeButton>
            </div>
        </div>
    );
}
