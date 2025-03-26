import './explore.css';
import { Container } from '../../components/atoms/container/container.tsx';
import { ComingSoon } from '../../components/molecules/coming-soon/coming-soon.tsx';

export function Explore() {
    // const { mapElement } = useMap();

    return (
        <Container height={'100vh'} display={'flex'}>
            <ComingSoon />
            {/*<Container width={'50%'}>*/}
            {/*    <Text fontSize={'2rem'}>Escreve qualquer coisa 😎</Text>*/}
            {/*    <TextInput />*/}
            {/*</Container>*/}
            {/*<Container width={'50%'}>*/}
            {/*    <div id={'map'} ref={mapElement}></div>*/}
            {/*</Container>*/}
        </Container>
    );
}