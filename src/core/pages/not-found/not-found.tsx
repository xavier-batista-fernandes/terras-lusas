import './not-found.css';
import { useNavigate } from 'react-router-dom';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1>404 - Oops!</h1>
            <p>Ui, vieste parar a Espanha?</p>
            <p>Este site é só para as terras lusas, mas parece que saltaste para o lado de lá!</p>
            <HomeButton fontSize={'0.85rem'} onClick={() => navigate('/')}>
                Regressar a Portugal
            </HomeButton>
        </div>
    );
}
