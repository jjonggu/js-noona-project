let horizontalUnderLine = document.getElementById('horizontal-uderline')
let horizontalMenus = document.querySelectorAll('nav:first-child a')


horizontalMenus.forEach((menu) => 
    menu.addEventListener('click', (e) => horizontalIndicator(e))
);

function horizontalIndicator(e){
    // offset(top, height, width, left)타입
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px"
}