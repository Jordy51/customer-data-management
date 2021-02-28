let select = document.getElementsByClassName("select")[0];

select.addEventListener("change" , (event) => {
		event.path[1].children[0].setAttribute("type",event.path[0].value)
	})