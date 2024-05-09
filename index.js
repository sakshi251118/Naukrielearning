import course_list from "./course_list.js";

function addToCart(id) {
  const courseList = getCourseList(); // Getting data from data list
  const updatedCourseList = courseList.map((course) =>
    course.id === id ? { ...course, addedToCart: true } : course);
  //Id number provided above
  setCourseList(updatedCourseList);
  updateCartCountDot();
  renderCourseList(updatedCourseList);
}

function removeFromCart(id) {
  const courseList = getCourseList();
  const updatedCourseList = courseList.map((course) =>
    course.id === id ? { ...course, addedToCart: false } : course
  );
  setCourseList(updatedCourseList);
  updateCartCountDot();
  renderCourseList(updatedCourseList);
}

function setCourseList(courseList) {
  localStorage.setItem("courseList", JSON.stringify(courseList));
}
//Function to fetch course list
function setInitialCourseList(courseList) {
  const localStorageCourseList = localStorage.getItem("courseList");

  if (localStorageCourseList === null)
    localStorage.setItem("courseList", JSON.stringify(courseList));
}
//Function to take course file data
function getCourseList() {
  const localStorageCourseList = localStorage.getItem("courseList");
  return JSON.parse(localStorageCourseList);
}
//Function to display courses in cart
function renderCourseList(courseList) {
  const isSearching = localStorage.getItem("isSearching") || false;
  const courseListContainer = document.querySelector("#course-list-container");
  courseListContainer.innerHTML = ""; // Clear the container first
  const displayCourseList = !isSearching
    ? courseList.filter((course) => course.isSearchResult)
    : courseList;

  displayCourseList.forEach((course) => {
    const courseCard = generateCourseCardHTML(course);
    courseListContainer.appendChild(courseCard); // Append each course card to the container
  });
}

function generateCourseCardHTML(course) {
  const courseCard = document.createElement("div");
  courseCard.setAttribute("class", "col-lg-3 col-md-6 mb-4");

  const addToCartButton = `<button onclick='addToCart(${course.id})' class="btn btn-primary">Add to Cart</a>`;
  const removeFromCartButton = `<button onclick='removeFromCart(${course.id})' class="btn btn-danger">Remove from Cart</a>`;

  const cartButton = course.addedToCart
    ? removeFromCartButton
    : addToCartButton;

  courseCard.innerHTML = `
  <div class="card" data-toggle="modal" data-target="#courseDetailsModal">
  <img id="courses-size" src="${window.location.origin}/${course.image}"
      class="card-img-top" alt="Course Image">
  <div class="card-body">
      <h5 class="card-title"><a href="${window.location.origin}/${course.link}">${course.title}</a></h5>
      
      ${cartButton}
  </div>
</div>
`;
  return courseCard;
}
//to update cart
function updateCartCountDot() {
  const courseList = getCourseList();
  const cartCount = courseList.filter((course) => course.addedToCart).length;
  const cartElm = document.querySelector("#nav-cart");
  cartElm.setAttribute(
    "data-cart-count",
    `${cartCount > 9 ? "9+" : cartCount}`
  );
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

function main() {
  setInitialCourseList(course_list); // fETCH COURSES
  const courseList = getCourseList(); //fetch courses
  localStorage.setItem("isSearching", false);
  updateCartCountDot();
  renderCourseList(courseList);
}

function performSearch() {
  const query = document.getElementById("searchInput").value;
  if (query.length > 0) {
    localStorage.setItem("isSearching", true);
  } else {
    localStorage.setItem("isSearching", false);
  }
  const courseList = getCourseList();
  const displayCourseList = courseList
    .filter((course) => course.title.fuzzySearch(query))
    .map((course) => ({ ...course, isSearchResult: true }));
  renderCourseList(displayCourseList);
}

function clearSearch() {
  localStorage.setItem("isSearching", false);
  const courseList = getCourseList();
  const displayCourseList = courseList.map((course) => ({
    ...course,
    isSearchResult: false,
  }));
  renderCourseList(displayCourseList);
}

const fuzzySearch = function (query) {
  const str = this.toLowerCase();
  let i = 0,
    n = -1,
    l;
  query = query.toLowerCase();
  for (; (l = query[i++]); ) {
    if (!~(n = str.indexOf(l, n + 1))) {
      return false;
    }
  }
  return true;
};
String.prototype.fuzzySearch = fuzzySearch;

window.performSearch = performSearch;
window.clearSearch = clearSearch;
main();
