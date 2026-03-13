import { useEffect, useState } from 'react'

function Forum() {
  const [intro, setIntro] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/forum/')
      .then(res => res.json())
      .then(data => setIntro(data.message))
  }, [])

  return <h1>{intro || 'Loading...'}</h1>
}

export default Forum