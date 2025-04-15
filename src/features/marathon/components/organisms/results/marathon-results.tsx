import './marathon-results.css';
import { useMarathon } from '../../../providers/marathon-provider.tsx';
import { HomeButton } from '../../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { useNavigate } from 'react-router-dom';

export function MarathonResults() {

    const navigate = useNavigate();
    const {
        marathonStart,
    } = useMarathon();


    return <>
        <div className="marathon-results">
            <div className="container">
                <div className="header">
                    <h1>Resultados</h1>
                </div>
                <div className="metrics">
                    <table>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td>Novos municípios descobertos</td>
                            <td>32</td>
                        </tr>
                        <tr>
                            <td>Distritos afetados</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>Distritos concluídos</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>Total de municípios</td>
                            <td>32/278</td>
                        </tr>
                        <tr>
                            <td>Tempo usado</td>
                            <td>2:53</td>
                        </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <div className="best-districts">
                </div>
                <div className={'actions'}>
                    <HomeButton primaryColor="#black" fontSize={'0.75rem'} onClick={marathonStart}>Jogar</HomeButton>
                    <HomeButton fontSize={'0.75rem'} isDisabled={true}>Partilhar</HomeButton>
                    <HomeButton fontSize={'0.75rem'} onClick={() => navigate('/')}>Sair</HomeButton>
                </div>
            </div>
        </div>
    </>;
}