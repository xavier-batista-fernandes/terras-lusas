import { FlyoutProps } from './flyout.props.ts';
import './flyout.css';

export function Flyout({ children, isOpen }: FlyoutProps) {

    return (
        <div className={'flyout-backdrop'}>
            <div className={`flyout-container ${isOpen ? 'open' : ''}`}>
                <div className={'flyout-content'}>
                    {children}
                </div>
            </div>
        </div>
    );
}