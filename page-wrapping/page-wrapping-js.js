export function buildPages(textDataOriginal, displayNode, pageHeight) {
  const pages = [[]];
  let hasToc = false;

  let currentPageHeight = 0;
  let currentPage = 0;

  const headings = [];

  textDataOriginal.forEach(textData => {
    const node = textData.getNode(displayNode.ownerDocument);
    //displayNode.appendChild(node);

    const textNodeHeight = textData.getHeight();

    if (currentPageHeight + textNodeHeight <= pageHeight) {
      currentPageHeight += textNodeHeight;
    } else {
      currentPage++;
      pages[currentPage] = []
      currentPageHeight = textNodeHeight;
    }

    const textNode = textData.getNode();

    // grab all headings
    Array.from(textNode.children).forEach(child => {
      if (child.tagName.match(/^H[1-3]$/) !== null) {
          headings.push({
              tagName: child.tagName,
              html: child.innerHTML,
              page: currentPage
          })
        }
    })

    pages[currentPage].push(textNode.innerHTML)
    //displayNode.appendChild(textNode);

  })

  //Create the ToC if there are at least 2 headings
  if (headings.length >= 2) {
      pages.unshift(getTOCData(headings))
      hasToc = true;
  }

  return {
      'pages': pages,
      'hasToc': hasToc
  };
}

function getTOCData(headings) {

  const tocRoot = document.createElement("div");
  tocRoot.id = "paged-toc-node"

  const tocHeading = document.createElement("h1");
  tocHeading.innerHTML = "Table of Contents"
  tocHeading.className = "paged-toc-h1"

  tocRoot.appendChild(tocHeading)

  const tocElements = [tocRoot.outerHTML]

  headings.forEach((heading) => {

      const currentParentElem = document.createElement("div");
      currentParentElem.className = "paged-toc"
      currentParentElem.onclick = () => PAGED_DISPLAY.showPage(heading.page + 1)

      const currentChildElem = document.createElement(heading.tagName);
      currentChildElem.innerHTML = heading.html;
      currentParentElem.appendChild(currentChildElem);

      tocElements.push(currentParentElem.outerHTML)
  })

  return tocElements

}