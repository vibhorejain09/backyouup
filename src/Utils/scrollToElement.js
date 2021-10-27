export default function scrollToElement(elementId) {
    const elem = document.getElementById(elementId);
    if (!elem) return window.scrollTo({ top: 0 });
    return elem.scrollIntoView();
  }