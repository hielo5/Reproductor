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
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "Message In A Bottle",
    artist: "The Police",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0001%20The%20Police%20-%20Message%20In%20A%20Bottle.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0001%20The%20Police%20-%20Message%20In%20A%20Bottle.mp3",
  },
  {
    name: "Música ligera",
    artist: "Soda stereo",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0002%20soda%20stereo%20musica%20ligera.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0002%20soda%20stereo%20musica%20ligera.mp3",
  },
  {
    name: "Ayer Me Llamó Mi Ex",
    artist: "KHEA ",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0003%20KHEA%20%20Ayer%20Me%20Llam%C3%B3%20Mi%20Ex.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0003%20KHEA%20%20Ayer%20Me%20Llam%C3%B3%20Mi%20Ex.mp3",
  },
  {
    name: "Love Is A Long Road",
    artist: "Tom Petty",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0004%20Love%20Is%20A%20Long%20Road%20-%20Tom%20Petty.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0004%20Love%20Is%20A%20Long%20Road%20-%20Tom%20Petty.m4a",
  },
  {
    name: "Un Misil en Mi Placard",
    artist: "Soda Stereo",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0005%20Un%20Misil%20en%20Mi%20Placard%20-%20Soda%20Stereo.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0005%20Un%20Misil%20en%20Mi%20Placard%20-%20Soda%20Stereo.m4a",
  },
  {
    name: "Snow (Hey Oh)",
    artist: "Red Hot Chili Peppers",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0006%20Snow%20(Hey%20Oh)%20-%20Red%20Hot%20Chili%20Peppers.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0006%20Snow%20(Hey%20Oh)%20-%20Red%20Hot%20Chili%20Peppers.m4a",
  },
  {
    name: "Tatiana",
    artist: "La Femme",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0007%20Tatiana%20-%20La%20Femme.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0007%20Tatiana%20-%20La%20Femme.m4a",
  },
  {
    name: " The Rockafeller Skank - Remastered Version",
    artist: "Fatboy Slim",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0008%20The%20Rockafeller%20Skank%20-%20Remastered%20Version%20-%20Fatboy%20Slim.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0008%20The%20Rockafeller%20Skank%20-%20Remastered%20Version%20-%20Fatboy%20Slim.m4a",
  },
  {
    name: "Otra Noche",
    artist: "Los Ángeles Azules, Nicki Nicole",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0009%20Otra%20Noche%20-%20Los%20%C3%81ngeles%20Azules,%20Nicki%20Nicole.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0009%20Otra%20Noche%20-%20Los%20%C3%81ngeles%20Azules,%20Nicki%20Nicole.m4a",
  },
  {
    name: "Si No Te Tengo Ángel Aquello Que Pasó",
    artist: "Ke Personajes",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0010%20Si%20No%20Te%20Tengo%20%C3%81ngel%20Aquello%20Que%20Pas%C3%B3%20-%20Ke%20Personajes.webp",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0010%20Si%20No%20Te%20Tengo%20%C3%81ngel%20Aquello%20Que%20Pas%C3%B3%20-%20Ke%20Personajes.m4a",
  },
  {
    name: "Adiós Amor Oye Mujer",
    artist: "Ke Personajes",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0011%20Adi%C3%B3s%20Amor%20Oye%20Mujer%20-%20Ke%20Personajes.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0011%20Adi%C3%B3s%20Amor%20Oye%20Mujer%20-%20Ke%20Personajes.m4a",
  },
  {
    name: "Pasarela ",
    artist: "Ñejo & Dalmata",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0012%20Pasarela%20-%20%C3%91ejo%20&%20Dalmata.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0012%20Pasarela%20-%20%C3%91ejo%20&%20Dalmata.m4a",
  },
  {
    name: "Si Me Dices Que Si",
    artist: "La K'onga",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0013%20Si%20Me%20Dices%20Que%20Si%20-%20La%20K'onga.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0013%20Si%20Me%20Dices%20Que%20Si%20-%20La%20K'onga.m4a",
  },
  {
    name: "Te Mentiria",
    artist: "La K'onga",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0014%20La%20Konga%20-%20Te%20Mentiria.webp",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0014%20La%20Konga%20-%20Te%20Mentiria.mp3",
  },
  {
    name: "0015 Me Va Bien Sin Ti",
    artist: "La K'onga, Marama",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0015%20Me%20Va%20Bien%20Sin%20Ti%20-%20La%20K'onga,%20Marama.webp",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0015%20Me%20Va%20Bien%20Sin%20Ti%20-%20La%20K'onga,%20Marama.m4a",
  },
    {
    name: "Vai Novinha Ah Ah Ah",
    artist: "Dyamante",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0016%20%20Dyamante%20-%20Vai%20Novinha%20Ah%20Ah%20Ah.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0016%20%20Dyamante%20-%20Vai%20Novinha%20Ah%20Ah%20Ah.mp3",
  },
      {
    name: "Hey Brother",
    artist: "Avicii",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0017%20Avicii%20-%20Hey%20Brother.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0017%20Avicii%20-%20Hey%20Brother.mp3",
  },
        {
    name: "Levels",
    artist: "Avicii",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0018%20Avicii%20-%20Levels.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0018%20Avicii%20-%20Levels.mp3",
  },
          {
    name: "Waiting For Love",
    artist: "Avicii",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0019%20Avicii%20-%20Waiting%20For%20Love.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0019%20Avicii%20-%20Waiting%20For%20Love.mp3",
  },
            {
    name: "Wake Me Up",
    artist: "Avicii",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0020%20Avicii%20-%20Wake%20Me%20Up.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0020%20Avicii%20-%20Wake%20Me%20Up.mp3",
  },
              {
    name: "the nights",
    artist: "Avicii",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0021%20avicii%20-%20the%20nights.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0021%20avicii%20-%20the%20nights.mp3",
  },
                {
    name: "Putita",
    artist: "Babasonicos",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0022%20Babasonicos-%20Putita.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0022%20Babasonicos-%20Putita.mp3",
  },
  {
    name: "La Dificil",
    artist: "Bad Bunny",
    image:
      "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0023%20%20Bad%20Bunny%20-%20La%20Dificil.jpg",
    path: "https://fabulous-daffodil-8ff2bd.netlify.app/audio/0023%20%20Bad%20Bunny%20-%20La%20Dificil.mp3",
  },
];

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[index].path;
  curr_track.load();

  // Seleccionar el elemento <img> y actualizar su src
  const track_art = document.getElementById("track_art");
  track_art.src = track_list[index].image;
  // Añadir clases para asegurar tamaño
  track_art.className = " w-full m-auto p-2 aspect-square bg-[#121212] rounded-2xl";

  track_name.textContent = track_list[index].name;
  track_artist.textContent = track_list[index].artist;
  now_playing.textContent = index + 1 + " / " + track_list.length;

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
  playpause_btn.innerHTML =
    '<svg width="50"  height="50" viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML =
    '<svg width="50"  height="50" viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
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
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

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
      button.className =
        "song-button bg-[#121212] col-span-3 active:bg-white active:text-black hover:bg-white/5 grid text-left p-2"; // puedes añadir más clases para estilizar
      button.textContent = `${track.name} - ${track.artist}`;
      button.addEventListener("click", () => {
        track_index = index; // Actualizar track_index aquí
        loadTrack(index);
        playTrack(); // Reproduce la canción seleccionada
        CloseList(); // Cierra la lista
      });
      lista.appendChild(button);
    });
  }

  generateSongButtons();
});

function Fullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Media Session API
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track_list[track_index].name,
    artist: track_list[track_index].artist,
    artwork: [
      { src: track_list[track_index].image, sizes: '512x512', type: 'image/jpeg/webp' }
    ]
  });

  navigator.mediaSession.setActionHandler('play', playTrack);
  navigator.mediaSession.setActionHandler('pause', pauseTrack);
  navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
  navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
}

function updateMediaSession() {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track_list[track_index].name,
      artist: track_list[track_index].artist,
      artwork: [
        { src: track_list[track_index].image, sizes: '512x512', type: 'image/jpeg/webp' }
      ]
    });
  }
}

