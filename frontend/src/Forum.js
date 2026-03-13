import { useEffect, useState } from 'react'

function Forum() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/forum/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }, [])

  return <h1>{message || 'Loading...'}</h1>
}

export default Forum