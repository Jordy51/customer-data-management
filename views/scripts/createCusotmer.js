let selector = document.getElementById("store");

let customeField = document.getElementsByClassName("custom-fields")[0];

let toyFields = customeField.firstElementChild;

let electronicFields = customeField.lastElementChild;

selector.addEventListener("change", function () {
	storeType();
});

function storeType() {
	if (selector.value == "ToyStore") {
		toyFields.offsetParent ? null : customeField.appendChild(toyFields);
		customeField.id = "toys";
		electronicFields.remove();
	} else {
		electronicFields.offsetParent ? null : customeField.appendChild(electronicFields);
		customeField.id = "electronics";
		toyFields.remove();
	}
}

storeType();
