const adderButton = document.getElementsByClassName("adder")[0];

let counter = 1;

adderButton.addEventListener("click", (event) => {
  event.preventDefault();
  let tag = document.getElementById("cf-fields-add");
  let span = document.createElement("span");
  let input1 = document.createElement("input");
  input1.setAttribute("name", "" + counter)
  input1.setAttribute("type", "text")
  input1.setAttribute("required", "required")
  input1.setAttribute("placeholder", "Enter Field name");

  let selectorField = selectElemGen(counter);

  let deleterSpan = document.createElement("span");
  deleterSpan.setAttribute("class", "deleter");
  deleterSpan.innerHTML = `&nbsp;🗑`;

  deleterSpan.addEventListener("click", (event) => {
  	event.preventDefault();
	event.path[1].parentNode.removeChild(event.path[1]);
  })

  span.appendChild(input1);
  span.appendChild(selectorField);
  span.appendChild(deleterSpan);

  tag.appendChild(span);

  counter += 1;
});


function selectElemGen(selectName)
{
	let span = document.createElement("span");

	let select = document.createElement("select");
	select.setAttribute("name", "" + selectName + "-TYPE");
	select.setAttribute("class", "select");

	select.addEventListener("change" , (event) => {
		event.path[2].children[1].setAttribute("type",event.path[0].value)
	})

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

	span.appendChild(select);

	return span;
}
