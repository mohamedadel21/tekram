
export const  validateEmail = (email:any) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}



export const  validateName = (name:any) => {
	var re = /^[-'.a-zA-Z\s][a-zA-Z\s][a-zA-Z'.-\s]*$/;
	return re.test(String(name).toLowerCase());
}

export const  validatePhone = (phone:any) => {
	var re =/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
	return re.test(String(phone).toLowerCase());
}

export const  validateNumber = (number:any) => {
	var re = /^[0-9]*$/
	return re.test(String(number).toLowerCase());
}
export const  validateExpiryDate = (date:any) => {
	var re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
	return re.test(String(date).toLowerCase());
}


