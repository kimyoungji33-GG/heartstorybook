'use strict';

const roomSettings = Object.freeze({
  reading: location.hostname === '127.0.0.1',
  testing: ['127.0.0.1', 'localhost'].includes(location.hostname) &&
    new URLSearchParams(location.search).get('test') === '1',
});
