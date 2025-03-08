import { Container } from '../../atoms/container/container.tsx';
import { HomeButton } from '../../atoms/buttons/home-button/home-button.tsx';
import { Text } from '../../atoms/text/text.tsx';

export const Home = () => {
    return <>
        <Container
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100vh'}
        >
            <Text fontSize={'3rem'} margin={'10px 0'}>Terras Lusas</Text>
            <Text fontWeight={'lighter'} margin={'10px 0'}>Sabes onde é a tal terrinha do teu amigo António?</Text>
            <HomeButton margin={'20px'} onClick={() => console.log('Play click')}>Play</HomeButton>
        </Container>
    </>;
};