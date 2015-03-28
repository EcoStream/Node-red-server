// Parse api related
var Parse = require('node-parse-api').Parse;
var options = {
    app_id:'5dYyy3c3vgllE0btqL9N0rsbvzC0nj1t55c8wW8b',
    api_key:'JbvUWXoM5DeUskxy7CovPcOc6sHtDYMw4wBadtY5' // master_key:'...' could be used too
}
var app = new Parse(options);

// Send data to cloud
function dataHandler(data, beanId) {
    app.insert(beanId, {data: data.substring(1, data.length - 1)}, 
    	function (err, response) {
        	console.log(response);
    	} 
    );  
}

// Check argument length
var arguments = process.argv;
if (arguments.length < 4) {
	console.log("[error] Usage: node <path-to-this-file> <data> <beanId>");
	return;
}

// Get data and bean id
var data = arguments[2].toString('utf-8');
var beanId = arguments[3].toString('utf-8');

// Check if data is valid. Data is in form %12323%
if (data.length < 3) {
	console.log("[error] Invalid data field");
	return
}
var l1 = data.indexOf('%');
var l2 = data.indexOf('%', 1);
if (l1 != 0 || l2 != data.length - 1) {
	console.log("[error] Invalid data field");
	return;
}

// Check if bean id is valid
if (beanId.indexOf('-') > -1) {
	console.log("[error] Invalid beanId field");
	return;
}

console.log("[data] " + data);
console.log("[bean id] " + beanId);
dataHandler(data, beanId);

