'use strict';

// 마음동화책방 공개판에서 켜고 끄는 공간이에요.
// 공개 홈페이지는 거실과 동화가 중심이에요. 부엌·아랫목은 수련원(비공개) 재료로 보관하고 꺼 둬요.
// 내 컴퓨터에서 확인할 때는 주소 끝에 ?kitchen=1 이나 ?garden=1 을 붙이면 잠깐 켜져요(이미 ?가 있으면 &kitchen=1).
(() => {
  const features = {
    kitchen: false, // 부엌·아랫목·밥상 (꺼 둠)
    garden: false,  // 마음 텃밭 (잠가 둠. 다시 하고 싶을 때 true 로 바꾸면 돼요)
  };
  const params = new URLSearchParams(location.search);
  const local = ['127.0.0.1', 'localhost'].includes(location.hostname) || !/github\.io$/.test(location.hostname);
  for (const name of Object.keys(features)) {
    const value = params.get(name);
    if (local && (value === '1' || value === '0')) features[name] = value === '1';
  }
  window.homeFeatures = Object.freeze(features);
})();
