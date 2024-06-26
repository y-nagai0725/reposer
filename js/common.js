//全ページ共通のJS
$(function () {
  //ヘッダー
  const header = document.getElementById('header');

  //mv
  const mv = document.getElementById('mv');

  //ハンバーガーメニュー
  const hamburgerMenu = document.getElementById('hamburger-menu');

  //グローバルナビゲーション
  const gnav = document.getElementById('gnav');

  //js-クラス付与対象リスト
  const jsTargetList = document.querySelectorAll('.js-target, .js-fadeIn, .js-fadeUp');

  //クラス付与の位置調整用
  const adjustmentNumber = 0.5;

  //アンカーリンク
  const hrefLink = document.querySelectorAll('a[href^="#"]');

  //現在のページURLのハッシュ
  const hash = location.hash;

  //ページ外リンクからの遷移時
  if (hash) {
    $("html, body").stop().scrollTop(0);
    setTimeout(function () {
      const headerHeight = header.clientHeight;
      const target = $(hash);
      const position = target.offset().top - headerHeight;
      //指定の場所までスムーススクロール
      $("html, body").animate({ scrollTop: position }, 400, "swing");
    }, 100);
  }

  window.addEventListener('scroll', function () {
    setJsTargetActive();
  });

  //ハンバーガーメニュークリック時処理
  hamburgerMenu.addEventListener('click', function () {
    if (this.classList.contains('opened')) {
      this.classList.remove('opened');
      gnav.classList.remove('is-active');

      //スクロール禁止を解除
      document.removeEventListener('touchmove', noScroll);
      document.removeEventListener('wheel', noScroll);
    } else {
      this.classList.add('opened');
      gnav.classList.add('is-active');

      //メニューが開かれているときはスクロール禁止
      document.addEventListener('touchmove', noScroll, { passive: false });
      document.addEventListener('wheel', noScroll, { passive: false });
    }
  });

  //イベント処理禁止用
  function noScroll(e) {
    e.preventDefault();
  }

  //ナビゲーションリンククリック時処理
  hrefLink.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      //対象場所へスムーススクロール
      const href = this.getAttribute('href').replace('#', '');
      const headerHeight = header.clientHeight;
      const target = document.getElementById(href);
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scroll({
        top: targetPos,
        behavior: 'smooth',
      });

      //メニューを閉じる
      hamburgerMenu.classList.remove('opened');
      gnav.classList.remove('is-active');

      //スクロール禁止を解除
      document.removeEventListener('touchmove', noScroll);
      document.removeEventListener('wheel', noScroll);
    });
  });

  //対象にクラス付与
  function setJsTargetActive() {
    const windowHeight = window.innerHeight;
    const st = window.scrollY;
    jsTargetList.forEach((e) => {
      const position = e.getBoundingClientRect().top + st;
      if (st > position - windowHeight * adjustmentNumber) {
        e.classList.add('js-active');
      }
    });
  }

  //mv表示処理
  function startMv() {
    if (window.scrollY === 0) {
      mv.classList.add('first');
    } else {
      mv.classList.add('showed');
    }
  }

  //ページ表示時に実行
  startMv();

});