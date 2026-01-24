const form = document.getElementById('form')
form.addEventListener('submit', getMovie)

async function getId(movie) {
    try {
        const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=083d1d154463f65cbdd3f504c0b893d5&query=" + encodeURIComponent(movie))
        if (response.status != 200) {
            throw new Error(`${response.status} error`)
        }
        const data = await response.json()
        return(data.results[0].id)        
    } catch {
        console.error("getId failed")
        return null
    }
}

async function getMovie(e) {
    e.preventDefault()
    let title = document.getElementById('title').value
    let id = await getId(title)
    if (id == null){
        console.error("ID is invalid");
    }
    console.log(id)
    const iframe = document.getElementById('iframe')
    iframe.src = `https://111movies.com/movie/${id}`
}