import { Flyout } from '../../../molecules/flyout/flyout.tsx';
import { FlyoutProps } from './marathon-flyout.props.ts';

export function MarathonFlyout({ isOpen }: FlyoutProps) {
    return (
        <Flyout isOpen={isOpen}>
            <h1>Olá, eu sou um flyout!</h1>
            <p>Este é um componente de exemplo que pode ser utilizado para exibir informações adicionais ou ações em uma
                tela.</p>
        </Flyout>
    );
}