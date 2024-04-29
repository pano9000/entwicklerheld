function handleKeyDown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Escape') {
        return;
    }
    event.preventDefault();

    if (event.key === 'ArrowLeft') {
        PAGED_DISPLAY.highlightButton('prev-page', true);
    }  else if (event.key === 'ArrowRight') {
        PAGED_DISPLAY.highlightButton('next-page', true);
    } else if (event.key === 'Escape') {
        PAGED_DISPLAY.highlightButton('paged-close-button', true);
    }
}

function handleKeyUp(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Escape') {
        return;
    }
    event.preventDefault();

    if (event.key === 'ArrowLeft') {
        PAGED_DISPLAY.highlightButton('prev-page', false);
        PAGED_DISPLAY.gotoPage(-1);
    }  else if (event.key === 'ArrowRight') {
        PAGED_DISPLAY.highlightButton('next-page', false);
        PAGED_DISPLAY.gotoPage(+1);
    } else if (event.key === 'Escape') {
        PAGED_DISPLAY.highlightButton('paged-close-button', false);
        PAGED_DISPLAY.hide();
    }
}

class PagedDisplay {
    constructor() {
        this.pages = [];
        this.currentpage = -1;
        this.pageHeight = 0;
        this.isActive = false;
        this.outerContainer = null;
        this.pageSection = null;
        this.pagedTocSection = null;
        this.navigation = null;
        this.hasToc = false;
        this.tocNode = null;
    }
    loadText(htmlArray) {
        this.updateSize();
        const displayNode = document.createElement('div');
        displayNode.style.position = 'absolute';
        displayNode.style.top = '0';
        displayNode.style.left = '0';
        displayNode.style.display = 'block';
        displayNode.style.width = `${this.pageSection.clientWidth}px`;
        displayNode.style.maxHeight = `${this.pageHeight}px`;
        displayNode.style.overflow = 'hidden';
        displayNode.style.fontFamily = 'sans-serif';
        displayNode.style.fontSize = '1.2rem';
        document.body.appendChild(displayNode);
        const data = buildPages(htmlArray, displayNode, this.pageHeight);
        displayNode.parentNode.removeChild(displayNode);
        console.log(data);
        this.setPages(data);
    }
    updateSize() {
        this.setBodyScrollable(false);
        const maxWidth = window.screen.availWidth * 0.6;
        const maxHeight = window.screen.availHeight * 0.5;
        const marginX = (window.screen.availWidth - maxWidth) * 0.25;
        const marginY = (window.screen.availHeight - maxHeight) * 0.25;
        this.outerContainer = document.getElementById('paged-outer-container');
        this.outerContainer.classList.add('visible');

        const innerContainer = document.getElementById('paged-inner-container');
        innerContainer.style.width = `${maxWidth}px`;
        innerContainer.style.maxHeight = `${maxHeight}px`;
        innerContainer.style.margin = `${marginX}px ${marginY}px`;

        this.pageSection = document.getElementById('paged-display');
        this.pagedTocSection = document.getElementById('paged-toc-section');
        this.navigation = document.getElementById('paged-navigation');
        const wrapperHeight = maxHeight;
        const navigationHeight = this.getHeight(this.navigation);
        this.pageHeight = wrapperHeight - navigationHeight;
        this.pageSection.style.maxHeight = `${this.pageHeight}px`;
    }
    highlightButton(id, isHighlighted) {
        const node = document.getElementById(id);
        if (isHighlighted) {
            node.classList.add('highlighted');
        } else {
            node.classList.remove('highlighted');
        }
    }
    updateNavigation() {
        let node = document.getElementById('prev-page');
        if (this.currentpage > 0) {
            node.classList.remove('hidden');
        } else {
            node.classList.add('hidden');
        }
        node = document.getElementById('next-page');
        if (this.currentpage + 1 < this.pages.length) {
            node.classList.remove('hidden');
        } else {
            node.classList.add('hidden');
        }
        node = document.getElementById('current-page');
        node.innerHTML = `${this.currentpage + 1} / ${this.pages.length}`;

        if (this.hasToc) {
            if (this.currentpage === 0) {
                if (!this.tocNode) {
                    const node = document.getElementById('paged-toc-node');
                    node.removeAttribute('id');
                    this.tocNode = node.cloneNode(true);
                    this.pagedTocSection.appendChild(this.tocNode);
                } else {
                    this.pagedTocSection.classList.remove('visible');
                }
            } else {
                this.pagedTocSection.classList.add('visible');
            }
        }
    }
    show() {
        if (this.isActive) return;

        this.setBodyScrollable(false);
        this.isActive = true;
        this.outerContainer.classList.add('visible');
        this.showPage(this.currentpage === -1 ? 0 : this.currentpage);
    }
    hide() {
        if (!this.isActive) return;

        this.setBodyScrollable(true);
        this.isActive = false;
        this.outerContainer.classList.remove('visible');
    }
    setBodyScrollable(isScrollable) {
        if (isScrollable) {
            document.getElementsByTagName('body')[0].style.overflow = null;
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        } else {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }
    }
    gotoPage(d) {
        const pageIndex = this.currentpage + d;
        this.showPage(pageIndex);
    }
    showPage(pageIndex) {
        pageIndex = Math.max(0, Math.min(pageIndex, this.pages.length - 1));
        if (this.currentpage === pageIndex) return;

        if (this.currentpage > -1) {
            let pageNode = document.getElementById(`paged-page-${this.currentpage}`);
            pageNode.classList.remove('visible');
        }

        this.pageSection.style.height = `${this.pageHeight}px`;

        this.currentpage = pageIndex;
        let pageNode = document.getElementById(`paged-page-${this.currentpage}`);
        pageNode.classList.add('visible');

        this.updateNavigation();
    }
    getHeight(node) {
        const computedStyle = window.getComputedStyle(node);
        return node.offsetHeight
                + parseFloat(computedStyle.marginTop)
                + parseFloat(computedStyle.marginBottom)
                + parseFloat(computedStyle.borderTopWidth)
                + parseFloat(computedStyle.borderBottomWidth);
    }
    setPages(data) {
        this.isActive = true;
        this.hasToc = data.hasToc;
        this.tocNode = null;
        this.pages = data.pages;
        this.currentpage = -1;
        this.pageSection.innerHTML = '';
        for (const pageIndex in this.pages) {
            const pageContent = this.pages[pageIndex].join('');
            const page = `<div class="paged-page" id="paged-page-${pageIndex}">${pageContent}</div>`;
           this.pageSection.innerHTML += page;
        }
        this.hide();
    }
}

let PAGED_DISPLAY = new PagedDisplay();
window.onload = () => {
    PAGED_DISPLAY.loadText(html2);
}