import './side-navigation.css';
import { useState } from 'react';
import { IconOne } from '../../atoms/icons/icon-1.tsx';
import { IconTwo } from '../../atoms/icons/icon-2.tsx';
import { IconThree } from '../../atoms/icons/icon-3.tsx';
import { IconFour } from '../../atoms/icons/icon-4.tsx';
import { ArrowRightIcon } from '../../atoms/icons/arrow-right-icon.tsx';

export function SideNavigation() {

    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        console.log('Toggling', isOpen);
        setIsOpen((previous) => !previous);
    }

    return (
        <nav className="side-navigation-container" data-open={isOpen ? 'true' : 'false'}>
            <button onClick={toggle} data-open={isOpen ? 'true' : 'false'}>
                <ArrowRightIcon />
            </button>
            <hr />
            <ul>
                <li>
                    <a href="/">
                        <IconOne />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <IconTwo />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <IconThree />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <IconFour />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
