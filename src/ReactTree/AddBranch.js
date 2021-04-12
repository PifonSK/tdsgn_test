import React, {useState} from 'react'

function AddBranch({onCreate}) {
    const [value, setValue] = useState('')

    function submitHandler(event) {
        event.preventDefault()

        if (value.trim()) {
            onCreate(value)
            setValue('')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input value={value} onChange={event => setValue(event.target.value)} />
            <button className='button__add' type='submit'>Добавить запись в выбранную ветку</button>
        </form>
    )
}

export default AddBranch