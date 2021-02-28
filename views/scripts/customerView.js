let selector = document.getElementById("store");
let selectorContainer = document.getElementById("selector");

let toyFields = document.getElementById("toys-customer");

let electronicFields = document.getElementById("electronic-customer");

selector.addEventListener("change", function () {
	storeType();
});

function storeType() {
	if (selector.value == "ToyStore") {
		electronicFields.remove();
		toyFields.offsetParent ? null : selectorContainer.insertAdjacentElement("afterend", toyFields);
	} else {
		toyFields.remove();
		electronicFields.offsetParent ? null : selectorContainer.insertAdjacentElement("afterend", electronicFields);
	}
}

storeType();
