import './explore.css';
import { useMap } from '../../hooks/useMap.ts';
import { Container } from '../../components/atoms/container/container.tsx';
import { TextInput } from '../../components/atoms/inputs/text-input.tsx';
import { Text } from '../../components/atoms/text/text.tsx';

export function Explore() {
    const { mapElement } = useMap();

    return (
        <Container height={'100vh'} display={'flex'}>
            <Container width={'50%'}>
                <Text fontSize={'2rem'}>Escreve qualquer coisa 😎</Text>
                <TextInput />
            </Container>
            <Container width={'50%'}>
                <div id={'map'} ref={mapElement}></div>
            </Container>
        </Container>
    );
}