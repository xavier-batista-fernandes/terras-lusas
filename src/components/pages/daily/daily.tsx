import './daily.css';
import { Container } from '../../atoms/container/container.tsx';
import { Text } from '../../atoms/text/text.tsx';

export const Daily = () => {

    return <>
        <Container
            height={'100vh'}
            width={'100vw'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            overflow={'hidden'}
        >
            <Text fontSize={'3rem'} fontWeight={'bolder'}>Coming soon...</Text>
            <input type="text" name="Município" value="Leiria" placeholder="Oliveira do Hospital..." />
        </Container>
    </>;
};