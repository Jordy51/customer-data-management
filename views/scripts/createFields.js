const adderButton = document.getElementsByClassName("add-btn")[0];

let counter = 1;

adderButton.addEventListener("click", (event) => {
	event.preventDefault();
	event.stopPropagation();
	let tag = document.getElementById("custom-fields-add");
	let div = document.createElement("div");
	div.setAttribute("class", "field");

	let input1 = document.createElement("input");
	input1.setAttribute("class", "inp");
	input1.setAttribute("name", "" + counter);
	input1.setAttribute("type", "text");
	input1.setAttribute("required", "required");
	input1.setAttribute("placeholder", "Enter Field name");

	let selectorField = selectElemGen(counter);

	let deleterSpan = document.createElement("span");
	deleterSpan.setAttribute("class", "deleter");
	deleterSpan.innerHTML = "X";

	deleterSpan.addEventListener("click", (event) => {
		event.preventDefault();
		event.path[1].parentNode.removeChild(event.path[1]);
	});

	div.appendChild(input1);
	div.appendChild(selectorField);
	div.appendChild(deleterSpan);

	tag.appendChild(div);

	counter += 1;
});

function selectElemGen(selectName) {
	let select = document.createElement("select");
	select.setAttribute("name", "" + selectName + "-type");
	select.setAttribute("class", "select");

	let option1 = document.createElement("option");
	option1.setAttribute("value", "text");
	option1.innerText = "Text";

	let option2 = document.createElement("option");
	option2.setAttribute("value", "number");
	option2.innerText = "Number";

	let option3 = document.createElement("option");
	option3.setAttribute("value", "email");
	option3.innerText = "Email";

	let option4 = document.createElement("option");
	option4.setAttribute("value", "date");
	option4.innerText = "Date";

	select.appendChild(option1);
	select.appendChild(option2);
	select.appendChild(option3);
	select.appendChild(option4);

	return select;
}

let selector = document.getElementById("store");
let selectorContainer = document.getElementById("selector");

let toyFields = document.getElementById("toy-fields");

let electronicFields = document.getElementById("electronic-fields");

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
