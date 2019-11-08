const DomElement = function ({height, width, bg}) {
    this.height = height;
    this.width = width;
    this.bg = bg;
};

DomElement.prototype.start = function() {
    this.createSelector();
    this.eventListener();
};

DomElement.prototype.eventListener = function() {
    document.querySelector('body').addEventListener('keydown', function(event){
        let elem = document.querySelector('.square');
        switch(event.key){
            case 'ArrowLeft':
                elem.style.left=parseInt(getComputedStyle(elem).left) - 10 + 'px';
                break;
            case 'ArrowRight':
                    elem.style.left=parseInt(getComputedStyle(elem).left) + 10 + 'px';
                break;
            case 'ArrowUp':
                    elem.style.top=parseInt(getComputedStyle(elem).top) - 10 + 'px';
                break;
            case 'ArrowDown':
                    elem.style.top=parseInt(getComputedStyle(elem).top) + 10 + 'px';
                break;
        }
    });
};

DomElement.prototype.createSelector = function() {
    let elem = document.createElement('div');
    elem.className = 'square';
    elem.style.cssText=`height: ${this.height};
        width: ${this.width};
        background-color: ${this.bg};
        position: absolute;
        top: 50px;
        left: 50px;
    `;
    document.querySelector('body').appendChild(elem);
};

let elem1 = new DomElement({
    height: '100px',
    width: '100px',
    bg: 'green'
});

document.addEventListener("DOMContentLoaded", function(event) {
    elem1.start();
});