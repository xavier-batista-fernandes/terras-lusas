import './error-page.css';
import { SideNavigation } from '../../organisms/side-navigation/side-navigation.tsx';
import { SecondaryButton } from '../../atoms/buttons/secondary-button/secondary-button.tsx';

export function ErrorPage() {

    const refresh = () => {
        window.location.reload();
    };

    const exit = () => {
        window.location.href = '/';
    };

    return (
        <>
            <SideNavigation />
            <div className="error-page-container">
                <img src="/assets/icons/trail-sign-sharp-svgrepo-com.svg" alt="FIXME" />
                <h1>Aconteceu um erro inesperado</h1>
                <p>Experimenta atualizar a página ou sair para a página inicial.</p>
                <div className="actions">
                    <SecondaryButton onClick={refresh}>Atualizar</SecondaryButton>
                    <SecondaryButton onClick={exit}>Sair</SecondaryButton>
                </div>
            </div>
        </>
    );
}