import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'

function HomePage() {
  const apiBaseUrl = process.env.REACT_APP_API_URL //env variable for base url 
  const [user, setUser] = useState(
    { new_user: false, 
      username: '' ,
    }
  )
  const [threads, setThreads] = useState([])

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/forum/`, { 
      method: 'GET',
      credentials: 'include' 
    })
      .then(res => res.json())
      .then(data => setUser(data))
    
    fetch(`${apiBaseUrl}/api/forum/threads/`, { 
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setThreads(data.threads))
  }, [apiBaseUrl])

  return (
    <div className = "homepage">
      
      <div className = "header">
        <TopBar />
      </div>

      <div className = "user-intro">
        <h3>{user.username ? `Welcome ${user.username}` : 'Loading...'}!</h3>
      </div>

      <div className = "thread-list">
        {threads.map(thread => (
        <div key={thread.id}>
          <h4> {thread.title} </h4>
          <p> {thread.content} </p>
        </div>
        ))}
      </div>
    </div>
  )

}

export default HomePage