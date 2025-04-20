import './error-page.css';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';

export function ErrorPage() {

    const refresh = () => {
        window.location.reload();
    };

    const exit = () => {
        window.location.href = '/';
    };

    return (
        <div className={'error-page-container'}>
            <img src="/assets/icons/trail-sign-sharp-svgrepo-com.svg" alt="FIXME" />
            <h1>Aconteceu um erro inesperado</h1>
            <p>Experimenta atualizar a página ou sair para a página inicial.</p>
            <div className="actions">
                <HomeButton onClick={refresh}>Atualizar</HomeButton>
                <HomeButton onClick={exit}>Sair</HomeButton>
            </div>
        </div>
    );
}