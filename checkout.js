function generateProductCardHTML(course) {
  const productCard = document.createElement("div");
  productCard.setAttribute("class", "card border shadow-none");
  const productCardInnerHTML = `
                  <div class="card-body">
                      <div class="d-flex align-items-start border-bottom pb-3">
                          <div class="me-4">
                              <img src="${course.image}" alt="" class="avatar-lg rounded">
                          </div>
                          <div class="flex-grow-1 align-self-center overflow-hidden">
                              <div>
                                  <h5 class="text-truncate font-size-18"><a href="#" class="text-dark">${course.title}</a></h5>
                                  <p class="text-muted mb-0">
                                      <i class="bx bxs-star text-warning"></i>
                                      <i class="bx bxs-star text-warning"></i>
                                      <i class="bx bxs-star text-warning"></i>
                                      <i class="bx bxs-star text-warning"></i>
                                      <i class="bx bxs-star-half text-warning"></i>
                                  </p>
                              </div>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                              <ul class="list-inline mb-0 font-size-16">
                                  <li class="list-inline-item">
                                      <button style="background-color:white; outline:none; border:none;" class="text-muted px-1" onclick='removeFromCart(${course.id})'>
                                          <i class="mdi mdi-trash-can-outline"></i>
                                      </button>
                                  </li>
                                  
                              </ul>
                          </div>
                      </div>
                      <div>
                          <div class="row">
                              <div class="col-md-4">
                                  
                              </div>
                              <div class="col-md-5">
                                 
                              </div>
                              <div class="col-md-3">
                                 
                              </div>
                          </div>
                      </div>
                  </div>
      `;

  productCard.innerHTML = productCardInnerHTML;
  return productCard;
}

function renderCartList(courseList) {
  const cartContainer = document.querySelector("#cart-container");
  cartContainer.innerHTML = ""; // Clear the cart container first

  courseList.forEach((course) => {
    const cartItemHTML = generateProductCardHTML(course);
    cartContainer.appendChild(cartItemHTML); // Append each item as a child element
  });

  // Add the Continue Shopping and Checkout buttons after appending all items
  const additionalContent = `
      <div class="row my-4">
        <div class="col-sm-6">
          <a href="proffesionalcertiicates.html" class="btn btn-link text-muted">
            <i class="mdi mdi-arrow-left me-1"></i> Continue Shopping 
          </a>
        </div> <!-- end col -->
        <div class="col-sm-6">
          
        </div> <!-- end col -->
      </div>
    `;
    function validateForm() {
      var inputs = document.getElementsByTagName("input");
      var selects = document.getElementsByTagName("select");
      var slots = document.getElementsByName("slots");
      var checked = false;

      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
          alert("Please fill in all fields");
          return false;
        }
      }

      for (var i = 0; i < selects.length; i++) {
        if (selects[i].value === "") {
          alert("Please select an option for all dropdowns");
          return false;
        }
      }

      for (var i = 0; i < slots.length; i++) {
        if (slots[i].checked) {
          checked = true;
          break;
        }
      }

      return true;
    }

    function submitForm() {
        if (validateForm()) {
            // If form is valid, submit the form
            document.querySelector('.order-form').submit();
        } else {
            // If form is not valid, do nothing
            return false;
        }
    }
  

    // Form fileds are required
    document.getElementById("myForm").addEventListener("submit", function(event) {
      // Get all form fields
      var fields = document.querySelectorAll('#myForm input, #myForm select, #myForm textarea');
    
      // Check if all fields are filled out
      var isValid = true;
      fields.forEach(function(field) {
        if (!field.value.trim()) { // Check if field is empty or contains only whitespace
          isValid = false;
        }
      });
    
      // If any field is empty, prevent form submission
      if (!isValid) {
        event.preventDefault(); // Prevent the form from being submitted
        alert("Please fill out all fields before proceeding to checkout.");
      }
    });

  cartContainer.insertAdjacentHTML("beforeend", additionalContent); // Append additional content
}

function getCourseList() {
  const localStorageCourseList = localStorage.getItem("courseList");
  return JSON.parse(localStorageCourseList);
}

function getCartItems() {
  const courseList = getCourseList();
  const cartItems = courseList.filter((course) => course.addedToCart);
  return cartItems;
}

function updateCartSummary() {
  const cartItems = getCartItems();
  const cartValue = cartItems.reduce(
    (total, cartItem) => totalAmount + cartItem.price,
    0
  );
  const cartTotal = cartValue + 0;
  document.querySelector("#cart-value").textContent = `$ ${Math.round(
    cartValue
  )}`;
  document.querySelector("#cart-total").textContent = `$ ${Math.round(
    totalAmount
  )}`;
}

function updateCartCountDot() {
  const courseList = getCourseList();
  const cartCount = courseList.filter((course) => course.addedToCart).length;
  const cartElm = document.querySelector("#nav-cart");
  cartElm.setAttribute(
    "data-cart-count",
    `${cartCount > 9 ? "9+" : cartCount}`
  );
  
}
function setslotvalue(Slots){
localStorage.setItem("slotvalue", Slots)
}
function updateslotvalue(slots) {
  // Your existing logic for calculating exam slot price
  setslotvalue(slot);
  const slotvalue = getslotvalue()
  const totalvalueelm = document.getElementById("exam-slot");
  if (slotvalue == "3PM-5PM"){
    totalvalueelm.innerText = "2000";
  }
  else if(slotvalue == "5PM-7PM"){
    totalvalueelm.innerText = "3000";
  }
  else if(slotvalue == "7PM-9PM"){
    totalvalueelm.innerText = "4000";
  }

}
function getslotvalue(){
  const slotvalue = localStorage.getItem("slotvalue")
  return slotvalue;
}

function removeFromCart(id) {
  const courseList = getCourseList();
  const updatedCourseList = courseList.map((course) =>
    course.id === id ? { ...course, addedToCart: false } : course
  );
  setCourseList(updatedCourseList);
  updateCartCountDot();
  updateCartSummary();
  const cartItems = getCartItems();
  renderCartList(cartItems);
}

function setCourseList(courseList) {
  localStorage.setItem("courseList", JSON.stringify(courseList));
}

window.removeFromCart = removeFromCart;

function main() {
  const cartItems = getCartItems();
  renderCartList(cartItems);
  updateCartCountDot();
  updateCartSummary();
}
function slot(){
  alert("Slots Are Filling Fast!")
}

const examDateInput = document.getElementById("exam-date");
const slotsContainer = document.getElementById("slots");
// const timeSlots = document.getElementById("timeSlots"); // Optional

const availableSlots = [
  
  "9AM-11AM",
  "11AM-1PM",
  "1PM-3PM",
  "3PM-5PM",
  "5PM-7PM",
  "7PM-9PM"
  // Add more slots as needed
];

examDateInput.addEventListener("change", (event) => {
  // Handle date change
  const selectedDate = new Date(event.target.value);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Set tomorrow's date

  selectedDate.setHours(0, 0, 0, 0); // Set time to zero for comparison
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  // Replace with your logic to check for available slots on selected date
  const areSlotsAvailable = (selectedDate) => {
      // Simulate checking availability based on a sample schedule
      const unavailableDates = [
          // List unavailable dates (e.g., holidays)
          new Date("2024-04-10"), // Replace with specific unavailable dates
          new Date("2024-04-15")
      ];

      // Check if selected date is unavailable
      return !unavailableDates.some((unavailableDate) => unavailableDate.getTime() === selectedDate.getTime());
  };

  if (selectedDate.getTime() === today.getTime() || selectedDate.getTime() === tomorrow.getTime()) {
      if (areSlotsAvailable) {
          // Display available slots
          slotsContainer.innerHTML = `
      <h3>Available Slots:</h3>
      <div id="slots" class="slots">
  <input type="radio" id="slot1" name="slots" value="9AM-11AM" disabled>
  <label for="slot1" style="background-color: #ffcccc;"><s>9AM-11AM</s></label>
  <input type="radio" id="slot2" name="slots" value="11AM-1PM">
  <label for="slot2" style="background-color: #ffcccc;"><s>11AM-1PM</s></label>
  <input type="radio" id="slot3" name="slots" value="1PM-3PM">
  <label for="slot3"  style="background-color: #FFD580;">1PM-3PM</label>
  <input type="radio" id="slot4" name="slots" value="3PM-5PM">
  <label for="slot4" onclick="updateslotvalue('3PM-5PM')" style="background-color: #FFD580;">3PM-5PM</label>
  <input type="radio" id="slot5" name="slots" value="5PM-7PM">
  <label for="slot5" style="background-color: #FFD580;">5PM-7PM</label>
  <input type="radio" id="slot6" name="slots" value="7PM-9PM">
  <label for="slot6" style="background-color: #FFD580;">7PM-9PM</label>
  
</div><br>
<br/>


  <imp><b>*Only few slots are available.Kindly consult your counsellor before submission</b></imp>
  <div>
  <label for="course-amount">Professional certification course fees:</label>
  <input type="text" id="course-amount" placeholder="Enter professional certification course fees">
  <button onclick="calculateTotal(event) "  class="btn btn-primary">Lock the price</button>
  <br/><br/>
  <imp id="lockedPriceText" style="display: none;"><b>*This offer has locked your price for a 30-minute window. If not finalized within this period, the deal could be withdrawn due to limited number of exam slots available.</b></imp>
</div>
<br/>
  <div class="card border shadow-none">
  <div class="card-header bg-transparent border-bottom py-3 px-4">
      <h5 class="font-size-16 mb-0">Order Summary <span class="float-end"></span></h5> 
  </div>
  <div class="card-body p-4 pt-2">
      
      <div class="table-responsive mt-4">
          <table class="table mb-0">
              <tbody>
              <tr>
              <td>Certification Course Fees:</td>
              <td class="text-end" id="course">INR 0</td>
          </tr>
                  <tr>
                      <td>Exclusive Slot Fees:</td>
                      <td class="text-end" id="exam-slot">INR 4000</td>
                  </tr>
                  <tr class="bg-light">
                      <th>Total :</th>
                      <td class="text-end">
                          <span class="fw-bold" id="total">INR 4000</span>
                      </td>
                  </tr>
                 
              </tbody>
          </table>
         
      </div>
  </div>
</div>
<button
        type="button"
        class="submit-btn"
       
        onclick="submitForm() "
        style="text-transform: none; text-decoration: none; color: white"
      >
        Submit
      </button>

      
    `;


    function calculateTotal(event) {
         // Show the locked price text
  document.getElementById("lockedPriceText").style.display = "block";
  
      // Get the amount entered by the user
      const courseAmount = parseFloat(document.getElementById("course-amount").value);
      document.getElementById("course").textContent = "INR " +courseAmount;
      // Add 4000 to the amount entered by the user
      const totalAmount = courseAmount + 4000;
  
      // Update the total amount displayed in the order summary
      document.getElementById("total").textContent = "INR " + totalAmount;
      event.preventDefault();
  }
  window.calculateTotal = calculateTotal;
//Function to update course amount
function updateCourseAmount() {
  // Get the input value from the user
  const courseAmountInput = document.getElementById("course-amount");
  const courseAmount = parseFloat(courseAmountInput.value);

  // Check if the input value is valid (not empty and a positive number)
  if (isNaN(courseAmount) || courseAmount <= 0) {
      alert("Please enter a valid amount.");
      return; // Stop further execution
  }

  // Update the total amount
  const examSlotAmount = 780; // Assuming this is a fixed value
  const totalAmount = examSlotAmount + courseAmount;

  // Display the updated total
  document.getElementById("total").textContent = `INR ${totalAmount.toFixed(2)}`;
}


          // Show dynamically generated time slots and hide pre-defined slots (if any)
          if (timeSlots) {
              timeSlots.style.display = "none";
          }

          // Generate radio buttons and labels within the dynamically created list
          const dynamicSlots = slotsContainer.querySelector("ul");
          availableSlots.forEach((slot) => {
              const radio = document.createElement("input");
              // radio.type = "radio";
              // radio.name = "timeSlot";
              // radio.value = slot;

              const label = document.createElement("label");
              label.textContent = slot;
              label.setAttribute("for", radio.id);

              const li = document.createElement("li");
              // li.appendChild(radio);
              li.appendChild(label);

              dynamicSlots.appendChild(li);
          });
      } else {
          // Display message for no slots or full slots
          slotsContainer.innerHTML = "<p>Slots are full for the selected date.</p>";
          if (timeSlots) {
              // timeSlots.style.display = "none";
          }
      }
  } else {
      // Display message for unavailable slots
      slotsContainer.innerHTML = "<p>Time slots not available for this date.</p>";
       // Disable the submit button
    document.getElementById("submitBtn").disabled = true;
      
      if (timeSlots) {
          timeSlots.style.display = "none";
      }
  }
});


main();
window.updateslotvalue = updateslotvalue;