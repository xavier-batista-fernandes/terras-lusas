import './text-input.css';

export const TextInput = () => {
    const onInput = (event: any) => {
        // console.log(event);
        console.log(event.target.value);
    };

    return <>
        <div>
            <input
                type={'text'}
                placeholder={'Lisboa...'}
                list={'options'}
                className={'text-input'}
                onInput={event => onInput(event)}
            />
            <datalist id="options">
                <option value="Portugal" />
                <option value="Spain" />
                <option value="France" />
            </datalist>
        </div>
    </>;
};