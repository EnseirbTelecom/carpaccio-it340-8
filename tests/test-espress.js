var request = require('request'),
	postData = {},
	postConfig = {},
	postSuccessHandler = null;

postData = {
    "prices" : [10, 20],
    "quantities" : [1, 2]
};

postConfig = {
    url:'http://localhost:3000/bill',
    form: postData
};

postSuccessHandler = function (err, httpResponse, body) {
	console.log('JSON response from the server: ' + body);
};

//make the POST request
request.post(postConfig, postSuccessHandler);
