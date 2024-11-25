let player;
let currentPlaylist = [];
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '',
    });
}
function searchVideos() {
    const query = document.getElementById('searchInput').value;
    const url = "https//www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=videomusica&key=AIzaSyCSv9orXUrhCIRSIWaUJL9Jl-LSSKCIhTI";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';
            data.items.forEach(item => {
                const videoItem = document.createElement('li');
                videoItem.innerHTML = `
                    <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
                    <h3>${item.snippet.title}</h3>
                    <button onclick="playVideo('${item.id.videoId}')">Reproducir</button>
                `;
                resultsContainer.appendChild(videoItem);
            });
        })
        .catch(error => console.log(error));
}

function playVideo(videoId) {
    player.loadVideoById(videoId);
    currentPlaylist.push(videoId);
    updatePlaylistDisplay();
}

function savePlaylist() {
    localStorage.setItem('myPlaylist', JSON.stringify(currentPlaylist));
    alert('Playlist guardada');
}

function loadPlaylist() {
    const savedPlaylist = JSON.parse(localStorage.getItem('myPlaylist'));
    if (savedPlaylist) {
        currentPlaylist = savedPlaylist;
        alert('Playlist cargada');
        updatePlaylistDisplay();
    } else {
        alert('No hay playlist guardada');
    }
}

function updatePlaylistDisplay() {
    const playlistContainer = document.getElementById('playlist');
    playlistContainer.innerHTML = '';
    currentPlaylist.forEach(videoId => {
        const listItem = document.createElement('li');
        listItem.innerText = videoId;
        playlistContainer.appendChild(listItem);
    });
}