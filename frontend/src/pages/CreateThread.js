import { useState } from 'react'
import getCookie from '../utils/csrf'

function CreateThread(){
    const apiBaseUrl = process.env.REACT_APP_API_URL //env variable for base url 
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    function handleSubmit(event){
        event.preventDefault()

        fetch(`${apiBaseUrl}/api/forum/threads/`,{
            method: 'POST',
            credentials: 'include',
            headers: { 
                'Content-Type' : 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({title, content})
        })
    }

    return(
      <form onSubmit={handleSubmit}>
            <input value={title} onChange={event => setTitle(event.target.value)} />
            <textarea value={content} onChange={event => setContent(event.target.value)} />
            <button type="submit"> Post </button>
      </form>
    )
}

export default CreateThread