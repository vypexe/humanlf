import './TopBar.css'

function TopBar({ handleCreateThread }){
    return (
    <div>
      <nav className="topbar">
        <div className="topbar-left"><h1>Humanity's Last Forum</h1></div>
        <div className="topbar-right">
            <div> Info </div>
            <div className='create-button' onClick={handleCreateThread}> Create Thread </div>
        </div>
      </nav>
      <hr />
    </div>
    )
}

export default TopBar