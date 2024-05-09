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
    <label for="slot3"  style="background-color: #ffcccc;"><s>1PM-3PM</s></label>
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
    <input type="text" id="course-amount" placeholder="Enter amount">
    <button onclick="calculateTotal()" class="btn btn-primary">Lock the price</button>
</div>
    <div class="card border shadow-none">
    <div class="card-header bg-transparent border-bottom py-3 px-4">
        <h5 class="font-size-16 mb-0">Order Summary <span class="float-end"></span></h5> 
    </div>
    <div class="card-body p-4 pt-2">
        
        <div class="table-responsive mt-4">
            <table class="table mb-0">
                <tbody>
            
                    <tr>
                        <td>Exam Slot :</td>
                        <td class="text-end" id="exam-slot">INR 4000</td>
                    </tr>
                    <tr class="bg-light">
                        <th>Total :</th>
                        <td class="text-end">
                            <span class="fw-bold" id="total">${totalAmount}</span>
                        </td>
                    </tr>
                   
                </tbody>
            </table>
           
        </div>
    </div>
</div>


        
      `;
      function calculateTotal() {
        // Get the amount entered by the user
        const courseAmount = parseFloat(document.getElementById("course-amount").value);
    
        // Add 4000 to the amount entered by the user
        const totalAmount = courseAmount + 4000;
    
        // Update the total amount displayed in the order summary
        document.getElementById("totalAmount").textContent = totalAmount;
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
        if (timeSlots) {
            timeSlots.style.display = "none";
        }
    }
});

