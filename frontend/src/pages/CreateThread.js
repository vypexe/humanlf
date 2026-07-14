import { useState } from 'react'
import getCookie from '../utils/csrf'
import { useNavigate } from 'react-router-dom'

function CreateThread(){
    const apiBaseUrl = process.env.REACT_APP_API_URL //env variable for base url 
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

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
        }).then(() => {
            navigate('/');
        });
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