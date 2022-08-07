import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('loaded', function (id) {
  const savedPos = Number.parseFloat(localStorage.getItem('videoplayer-current-time'));
  if (savedPos) {
    player.setCurrentTime(savedPos).then(function (seconds) {
      console.log(`Seeked to ${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}`);
    }).catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log('Failed to set time. Range error!');
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
  }
})

player.on('timeupdate', throttle(function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000));

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });