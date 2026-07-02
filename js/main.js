// document.querySelectorAll('.qa-question').forEach(btn => {
//     btn.addEventListener('click', () => {
//         const answer = btn.nextElementSibling;
//         answer.style.display =
//             answer.style.display === 'block' ? 'none' : 'block';
//     });
// });

// document.querySelectorAll('.q').forEach(q => {
//     q.addEventListener('click', () => {

//         const item = q.parentElement;

//         document.querySelectorAll('.qa-item').forEach(other => {
//             if (other !== item) {
//                 other.classList.remove('active');
//             }
//         });

//         item.classList.toggle('active');
//     });


// });

document.querySelectorAll(".q").forEach(q => {
    q.addEventListener("click", () => {
        const item = q.parentElement;

        document.querySelectorAll(".qa-item").forEach(el => {
            if (el !== item) el.classList.remove("active");
        });

        item.classList.toggle("active");
    });
});

$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".hamburger").on("click", function () {
        $("header").toggleClass("open");
    });
    // メニューのリンクをクリックした時
    $("nav a").on("click", function () {
        $("header").toggleClass("open");
    });

    /*=================================================
   スムーススクロール
   ===================================================*/
    // ページ内のリンクをクリックした時に動作する
    $('a[href^="#"]').click(function () {
        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top - $("header").outerHeight(); // ヘッダーの高さ分オフセット;
        // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
        // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
        $("html, body").animate({ scrollTop: position }, 800, "swing");
        // urlが変化しないようにfalseを返す
        return false;
    });

    /*=================================================
    スクロール時フェード表示
    ===================================================*/
    // スクロール時のイベント

    $(window).on("scroll", function () {
        let scroll = $(this).scrollTop(); // 現在のスクロール位置
        let windowHeight = $(this).height(); // ウィンドウの高さ

        // `.section-title` を順番に処理
        $(".section-title").each(function () {
            let target = $(this).offset().top; // 要素の位置
            console.log("Scroll:", scroll, "Target:", target, "WindowHeight:", windowHeight); // デバッグ用

            // 要素が画面内に入ったらクラスを追加
            if (scroll > target - windowHeight + 150) {
                $(this).addClass("visible");
            }
        });
    });

    // 初期表示のチェック
    $(window).trigger("scroll");



    $(".slide-items").slick({
        autoplay: true, // 自動再生
        arrows: true, // 矢印
        dots: true, // インジケーター
    });

    $(".room-image").slick({
        autoplay: true, // 自動再生
        fade: true,
        /* autoplaySpeed:1000, */
        // speed:1000,
        arrows: false, // 矢印
        dots: true, // インジケーター
    });

    /*=================================================
 （画面に表示されたタイミングで処理を実行）
 ===================================================*/

    $(window).on("scroll", function () {
        const scroll = $(this).scrollTop();
        const windowHeight = $(this).height();

        $(".left").each(function (index) {
            const target = $(this).offset().top;
            const $el = $(this);

            if (scroll > target - windowHeight + 150) {
                // 1回だけ実行
                if (!$el.data("shown")) {
                    $el.data("shown", true);

                    setTimeout(() => {
                        $el.addClass("slide-left");
                    }, index * 100); // 0.1秒ずつ
                }
            }
        });
    });


    /*=================================================
   スクロール時アニメーション（高速化版）
   ==================================================*/
    $(window).on("scroll", function () {
        const scroll = $(this).scrollTop();
        const windowHeight = $(this).height();

        $(".section-title,.balloon").each(function () {
            const target = $(this).offset().top;

            if (scroll > target - windowHeight + 150) {
                // すでに付いていれば何もしない
                if (!$(this).hasClass("balloon-active") && $(this).hasClass("balloon")) {
                    $(this).addClass("balloon-active");
                } else {
                    // $(this).addClass("visible show slide-left slide-right");
                }
            }
        });
    });

    // 初期表示時にもチェック
    $(window).trigger("scroll");


});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    if (!form) return;

    const submitBtn = form.querySelector('input[type="submit"]');
    const message = form.querySelector(".required-message");

    function checkRequired() {
        if (form.checkValidity()) {
            submitBtn.disabled = false;
            message.classList.remove("is-show");
        } else {
            submitBtn.disabled = true;
            message.classList.add("is-show");
        }
    }

    form.addEventListener("input", checkRequired);
    form.addEventListener("change", checkRequired);

    checkRequired();
});

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    const pageTitle = document.getElementById("page-title");
    const pageLead = document.getElementById("page-lead");
    const submitBtn = document.getElementById("submit-btn");

    if (mode === "reserve") {

        if (pageTitle) {
            pageTitle.textContent = "ご宿泊予約";
        }

        if (pageLead) {
            pageLead.textContent = "ご予約内容をご入力ください。";
        }

        if (submitBtn) {
            submitBtn.textContent = "予約する";
            submitBtn.classList.remove("search-btn");
            submitBtn.classList.add("reserve-btn");
        }
    }
});

const today = new Date().toISOString().split('T')[0];

const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

if (checkin && checkout) {
    checkin.setAttribute('min', today);
    checkout.setAttribute('min', today);

    checkin.addEventListener('change', () => {
        checkout.setAttribute('min', checkin.value);
    });
}

const form = document.querySelector(".search-form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');

        if (submitBtn.classList.contains("search-btn")) {
            alert("検索条件を受け付けました。");
        } else if (submitBtn.classList.contains("reserve-btn")) {
            alert("予約を受け付けました。");
        }
    });
}

const loginForm = document.querySelector(".login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("ログイン機能は現在準備中です。");
    });
}


const registerForm = document.querySelector(".register-form");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("会員登録が完了しました。");
    });
}

console.log("mypage loaded");

console.log("reservation detail loaded");

const cancelBtn = document.getElementById("cancelBtn");

if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        const result = confirm(
            "予約をキャンセルします。\nよろしいですか？"
        );

        if (result) {
            alert("キャンセルが完了しました。");
            location.href = "mypage.html";
        }
    });
}

