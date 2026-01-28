const form = document.getElementById('form')
const results = document.getElementById('results')
form.addEventListener('submit', searchMovies)

async function searchMovies(e){
    e.preventDefault()
    const input = document.getElementById('movie').value
    const response = await fetch("https://api.imdbapi.dev/search/titles?query=" + encodeURIComponent(input))
    const data = await response.json()
    const allTitles = data.titles
    results.innerHTML = ''
    results.style.display = 'block'
    for (let i = 0; i < allTitles.length; i++) {
        const movie = allTitles[i]
        const line = document.createElement('div')
        const poster = `<img src=${movie.primaryImage.url} class="poster">`
        const title = movie.primaryTitle
        line.innerHTML = poster + "  " + title
        line.onclick = function() {
            const iframe = document.getElementById('iframe')
            results.style.display = 'none'
            iframe.style.display = 'block'
            iframe.src = 'about:blank'
            iframe.src = `https://111movies.com/movie/${movie.id}`
        }
        results.appendChild(line)
    }
}