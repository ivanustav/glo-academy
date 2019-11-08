const DomElement = function ({selector, height, width, bg, fontSize, text}) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
};

DomElement.prototype.createSelector = function() {
    let tagName = this.selector[0] == '.' ? 'div' : 'p',
        elem = document.createElement(tagName);

    this.selector[0] == '.' ? elem.className = this.selector.slice(1) : elem.id = this.selector.slice(1);
    elem.style.cssText=`height: ${this.height};
        width: ${this.width};
        background-color: ${this.bg};
        font-size: ${this.fontSize};
    `;
    elem.innerText=this.text;
    document.querySelector('body').appendChild(elem);
};

let elem1 = new DomElement({
    selector: '.block',
    height: '100px',
    width: '600px',
    bg: 'green',
    fontSize: '20px',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend fringilla neque ac vestibulum. Etiam elementum neque at malesuada mollis.'
});

let elem2 = new DomElement({
    selector: '#superP',
    height: '200px',
    width: '500px',
    bg: 'blue',
    fontSize: '15px',
    text: 'Lorem ipsum de ac vestibulum. Etiam elementum neque at malesuada mollis.'
});

elem1.createSelector();
elem2.createSelector();