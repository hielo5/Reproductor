let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Message In A Bottle",
    artist: "The Police",
    image: "https://fabulous-daffodil-8ff2bd.netlify.app/caratula/0001%20The%20Police%20-%20Message%20In%20A%20Bottle.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0001%20The%20Police%20-%20Message%20In%20A%20Bottle.mp3"
  },
  {
    name: "Música ligera",
    artist: "Soda stereo",
    image: "https://fabulous-daffodil-8ff2bd.netlify.app/caratula/0002%20soda%20stereo%20musica%20ligera.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0002%20soda%20stereo%20musica%20ligera.mp3"
  },
  {
    name: "Ayer Me Llamó Mi Ex",
    artist: "KHEA ",
    image: "https://fabulous-daffodil-8ff2bd.netlify.app/caratula/0003%20KHEA%20%20Ayer%20Me%20Llam%C3%B3%20Mi%20Ex.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0003%20KHEA%20%20Ayer%20Me%20Llam%C3%B3%20Mi%20Ex.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Seleccionar el elemento <img> y actualizar su src
  const track_art = document.getElementById('track_art');
  track_art.src = track_list[track_index].image;
  // Añadir clases para asegurar tamaño
  track_art.className = "h-[200px] border";

  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = (track_index + 1) + " / " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<svg width="40"  height="40" viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<svg width="40"  height="40" viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>';
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function OpenList() {
  // Obtener los elementos por su id
  const reproductor = document.getElementById("Reproductor");
  const lista = document.getElementById("lista");

  // Agregar la clase "hidden" al elemento con id "Reproductor"
  reproductor.classList.add("hidden");

  // Quitar la clase "hidden" al elemento con id "lista"
  lista.classList.remove("hidden");
}

function CloseList() {
  // Obtener los elementos por su id
  const reproductor = document.getElementById("Reproductor");
  const lista = document.getElementById("lista");

  // Quitar la clase "hidden" al elemento con id "Reproductor"
  reproductor.classList.remove("hidden");

  // Agregar la clase "hidden" al elemento con id "lista"
  lista.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista");

  // Función para generar botones de canciones
  function generateSongButtons() {
    track_list.forEach((track, index) => {
      const button = document.createElement("button");
      button.className = "song-button border"; // puedes añadir más clases para estilizar
      button.textContent = `${track.name} - ${track.artist}`;
      button.addEventListener("click", () => {
        loadTrack(index);
        playTrack(); // Reproduce la canción seleccionada
        CloseList(); // Cierra la lista
      });
      lista.appendChild(button);
    });
  }

  generateSongButtons();
});

// Resto de tu código...
