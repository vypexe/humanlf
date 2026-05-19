import { useEffect, useState } from 'react'

function Forum() {
  const [user, setUser] = useState({ new_user: false, username: '' })

  useEffect(() => {
    const apiBaseUrl = process.env.REACT_APP_API_URL //env variable for base url
    fetch(`${apiBaseUrl}/api/forum/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  return (
    <div>
      <h3>{user.username ? `Welcome ${user.username}` : 'Loading...'}!</h3>
    </div>
  )
}

export default Forum