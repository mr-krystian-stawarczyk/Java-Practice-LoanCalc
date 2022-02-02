// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
	//Hide results before loading gif
	document.getElementById("results").style.display = "none";

	//Show loader

	document.getElementById("loading").style.display = "block";

	setTimeout(calculateResults, 1500);

	e.preventDefault();
});

//Calculate Function

function calculateResults() {
	const amount = document.getElementById("amount");
	const interest = document.getElementById("interest");
	const years = document.getElementById("years");

	const monthlyPayment = document.getElementById("monthly-payment");
	const totalPayment = document.getElementById("total-payment");
	const totalInterest = document.getElementById("total-interest");

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Monthly Payments

	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
		//Show results
		document.getElementById("results").style.display = "block";

		//Show loader

		document.getElementById("loading").style.display = "none";
	} else {
		showError("Please check Your numbers");
	}
}
//Creating div while err
function showError(err) {
	const errDiv = document.createElement("div");

	//Get elements
	const card = document.querySelector(".card");
	const heading = document.querySelector(".heading");

	errDiv.className = "alert alert-danger";

	errDiv.appendChild(document.createTextNode(err));

	// Inserting err above heading

	card.insertBefore(errDiv, heading);

	//Clear err after few sec

	setTimeout(clearErr, 3000);
	// Hide results while err
	if (err) {
		document.getElementById("loading").style.display = "none";
		document.getElementById("results").style.display = "none";
	}
}

function clearErr() {
	document.querySelector(".alert").remove();
}
