function getCookie(name){
    'split via ; name= '
    'split on ; csftoken='
    const value = `; ${document.cookie}`
    // value = "; user_id=5; csrftoken=abc123; theme=dark"
    const parts = value.split(`; ${name}=`)
    // parts = ["; user_id=5", "abc123; theme=dark"]

    if (parts.length === 2) {
        const lastPart = parts.pop()
        // lastPart = "abc123; theme=dark"

        const splitAgain = lastPart.split(';')
        // splitAgain = ["abc123", " theme=dark"]

        const cookieValue = splitAgain.shift()
        // cookieValue = "abc123"
        
        return cookieValue
    }
}

export default getCookie