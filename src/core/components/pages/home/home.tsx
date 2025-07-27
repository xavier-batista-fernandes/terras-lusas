import { SecondaryButton } from '../../atoms/buttons/secondary-button/secondary-button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    function onKnowMore(event: any, text: string) {
        event.stopPropagation();
        alert(text);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-bold text-gray-800">Terras Lusas</h1>
                        <img
                            className="max-h-16 w-16"
                            src="/favicon.svg"
                            alt="Logo Terras Lusas"
                        />
                    </div>
                    <div className="flex-1 mt-4 md:mt-0">
                        <p className="text-gray-700">
                            Estas são as <strong>Terras Lusas</strong>. Um jogo para todos
                            aqueles que com toda a confiança disseram:
                        </p>
                        <span className="block italic text-blue-700 my-2">
                            "Ah, isso? Fácil! Fica no distrito de Aveiro, pá. De certeza!"
                        </span>
                        <p className="text-gray-500">... e depois afinal é em Beja.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Modos de Jogo
                    </h2>
                    <p className="mb-4 text-gray-700">
                        Preparado para mostrar que sabes mais do que o teu tio nas festas
                        de família?
                    </p>
                    <ul className="grid gap-6 md:grid-cols-3">
                        <li
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate('/exploration')}
                            className="bg-blue-100/80 border border-blue-300 rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer flex flex-col items-start"
                        >
                            <h3 className="text-lg font-bold text-blue-600 mb-1">
                                Descobrimentos
                            </h3>
                            <p className="text-gray-700 mb-2">
                                Descobre os municípios ao teu ritmo. Navega pelo mapa,
                                aprende onde ficam, e fica a conhecer melhor Portugal.
                            </p>
                            <SecondaryButton
                                onClick={(event) => onKnowMore(event, 'Exploração')}
                            >
                                Saber mais
                            </SecondaryButton>
                        </li>
                        <li
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate('/marathon')}
                            className="bg-blue-100/80 border border-blue-300 rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer flex flex-col items-start"
                        >
                            <h3 className="text-lg font-bold text-blue-600 mb-1">
                                Maratona
                            </h3>
                            <p className="text-gray-700 mb-2">
                                Escreve o máximo de municípios num tempo limitado. Rápido,
                                divertido e ótimo para testar reflexos geográficos!
                            </p>
                            <SecondaryButton
                                onClick={(event) => onKnowMore(event, 'Maratona')}
                            >
                                Saber mais
                            </SecondaryButton>
                        </li>
                        <li
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate('/404')}
                            className="bg-blue-100/80 border border-blue-300 rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer flex flex-col items-start"
                        >
                            <h3 className="text-lg font-bold text-blue-600 mb-1">
                                Diário
                            </h3>
                            <p className="text-gray-700 mb-2">
                                Todos os dias um novo desafio para manter a tua pontaria
                                afinada. Bora lá começar o dia com um pouco de geografia!
                            </p>
                            <SecondaryButton
                                onClick={(event) => onKnowMore(event, 'Diário')}
                            >
                                Saber mais
                            </SecondaryButton>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
