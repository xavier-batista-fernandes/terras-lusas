import { useMarathon } from '../../providers/marathon-provider.tsx';
import { GameStates } from '../../models/game-states.ts';
import { ResultsModal } from '../../components/organisms/modals/results-modal/results-modal.tsx';
import { Container } from '../../components/atoms/container/container.tsx';
import { Text } from '../../components/atoms/text/text.tsx';
import './marathon-start.css';

export function MarathonFinished() {

    const {
        setGameState,
        guessedMunicipalities,
    } = useMarathon();

    function closeResultsModal() {
        setGameState(GameStates.NOT_STARTED);
    }

    return <>
        <ResultsModal onClose={closeResultsModal}>
            <Container display={'flex'} justifyContent={'center'}
                       flexDirection={'column'}>
                <Text fontSize={'clamp(12px, 1.5rem, 26px)'}>
                    Conseguiste escrever {guessedMunicipalities.size} concelhos. Boa pá!
                </Text>
            </Container>
        </ResultsModal>
    </>;
}