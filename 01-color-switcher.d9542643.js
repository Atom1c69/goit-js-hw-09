!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(){o=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),a(!0)})),e.disabled=!0;var o=0;function a(n){t.disabled=n,e.disabled=!n}e.addEventListener("click",(function(){clearInterval(o),a(!1)}))}();
//# sourceMappingURL=01-color-switcher.d9542643.js.map
