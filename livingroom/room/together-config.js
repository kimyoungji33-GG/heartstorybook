'use strict';

// 거실 같이 놀기(1단계) 설정이에요.
// 아래 Firebase 연결값은 비밀번호가 아니에요. 누가 무엇을 할 수 있는지는 Firebase 보호 규칙이 지켜요.
// 비밀번호·이메일·개인 정보는 이 파일에 적지 않아요.
window.togetherConfig = Object.freeze({
  enabled: true,
  maxPeople: 5, // 방석이 5개라서 5자리(0번~4번). 보호 규칙도 0~4번 자리만 허락해요.
  // 내 컴퓨터(127.0.0.1, localhost)에서는 연습용 칸, 공개 홈페이지에서는 공개 거실 칸을 써요.
  roomPath: ['127.0.0.1', 'localhost'].includes(location.hostname) ? 'livingroom-test' : 'livingroom',
  sendEveryMs: 250, // 움직일 때만, 1초에 4번까지 보내요.
  bubbleMs: 6000,   // 말풍선이 떠 있는 시간
  sayLimit: 40,     // 말은 40자까지
  nameLimit: 8,     // 이름은 8자까지
  firebase: Object.freeze({
    apiKey: 'AIzaSyDVjS64XHPa7VTNMzRjbu7TNHi_gJLzKN0',
    authDomain: 'heart-storybook-jjimjilbang.firebaseapp.com',
    // Realtime Database를 만든 뒤 Firebase 화면에 보이는 주소로 맞춰 주세요.
    // 미국(us-central1)으로 만들면 아래 주소 그대로예요. 다른 지역이면 주소가 달라요.
    databaseURL: 'https://heart-storybook-jjimjilbang-default-rtdb.firebaseio.com',
    projectId: 'heart-storybook-jjimjilbang',
    storageBucket: 'heart-storybook-jjimjilbang.firebasestorage.app',
    messagingSenderId: '731724624231',
    appId: '1:731724624231:web:293404dbec8e187b693fc2',
  }),
});
