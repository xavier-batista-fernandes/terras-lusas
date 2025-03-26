import { Flyout } from '../../../molecules/flyout/flyout.tsx';
import { HomeButton } from '../../../atoms/buttons/home-button/home-button.tsx';
import { FlyoutProps } from './marathon-flyout.props.ts';

export function MarathonFlyout({ onClose }: FlyoutProps) {
    return (
        <Flyout>
            <h1>Olá, eu sou um flyout!</h1>
            <p>Este é um componente de exemplo que pode ser utilizado para exibir informações adicionais ou ações em uma
                tela.</p>
            <HomeButton onClick={onClose}>Fechar</HomeButton>
        </Flyout>
    );
}