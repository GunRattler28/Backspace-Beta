const form = document.getElementById('form');
const results = document.getElementById('results');
const iframe = document.getElementById('iframe');

form.addEventListener('submit', searchMovies);

async function searchMovies(e) {
    e.preventDefault();

    const query = document.getElementById('title').value.trim();
    if (!query) return;

    results.innerHTML = 'Loading...';
    results.style.display = 'block';
    iframe.style.display = 'none';

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=083d1d154463f65cbdd3f504c0b893d5&query=${encodeURIComponent(query)}`
        );

        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        const items = data.results || [];

        results.innerHTML = '';

        if (items.length === 0) {
            results.innerHTML = '<p style="text-align:center; color:#aaa;">No results found</p>';
            return;
        }

        items.forEach(item => {
            if (item.media_type === 'person') return;
            const line = document.createElement('div');
            let posterHtml = 'No poster';
            if (item.poster_path) {
                posterHtml = `<img src="https://image.tmdb.org/t/p/w200${item.poster_path}" class="poster" alt="${item.title || item.name}">`;
            } else {
                posterHtml = `<img src="placeholder.jpg" class="poster" alt="No poster available">`;
            }

            const title = item.title || item.name || 'Unknown';
            const year = (item.release_date || item.first_air_date || '').slice(0, 4);
            const display = year ? `${title} (${year})` : title;

            line.innerHTML = posterHtml + display;

            line.onclick = () => {
                results.style.display = 'none';
                iframe.style.display = 'block';
                iframe.src = 'about:blank';
                let player;
                if (item.media_type == 'movie') {
                    player = `https://www.vidking.net/embed/movie/${item.id}?color=0066cc&autoPlay=true`
                } else if (item.media_type == 'tv') {
                    player = `https://www.vidking.net/embed/tv/${item.id}/1/1?color=0066cc&autoPlay=true&nextEpisode=true&episodeSelector=true`
                }
                setTimeout(() => {
                    iframe.src = player;
                }, 100);
            };

            results.appendChild(line);
        });

    } catch (err) {
        results.innerHTML = '<p style="color:red; text-align:center;">Error loading results</p>';
        console.error(err);
    }
}

function checkFullscreen() {
    if (document.fullscreenElement) {
        console.log("Fullscreen is ON");
    } else {
        console.log("Fullscreen is OFF");
    }
}

document.addEventListener('mozfullscreenchange', checkFullscreen);