export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  const cartElements = getLocalStorage("so-cart") || [];
  const totalItems = cartElements.reduce((sum, item) => sum + item.Quantity, 0) === NaN ? 0 : cartElements.reduce((sum, item) => sum + item.Quantity, 0);
  document.getElementById("totalItemsInCart").innerText = totalItems;
  document.getElementById("searchForm").onsubmit = async (event) => {
    event.preventDefault();
    window.location = `../search_page/index.html?search=${document.getElementById("search").value}`;
  };
  document.getElementById("totalItemsInCart").innerText = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")).length : 0;
}