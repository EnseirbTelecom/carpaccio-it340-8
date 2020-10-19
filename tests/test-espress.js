var request = require('request'),
	postData = {},
	postConfig = {},
    postSuccessHandler = null;

function testBillRequest(testMessage, postData) {
    postConfig = {
        url:'http://localhost:3000/bill',
        form: postData
    };
    
    postSuccessHandler = function (err, httpResponse, body) {
        console.log(testMessage + ": \n" + body);
    };
    
    //make the POST request
    request.post(postConfig, postSuccessHandler);
}

testBillRequest(
    "Bill - Test de succès",
    {
        "prices" : [10, 20],
        "quantities" : [1, 2]
    }
);

testBillRequest(
    "Bill - Test d'échec - prices et quantitites de longueurs différentes",
    {
        "prices" : [10, 20, 30],
        "quantities" : [1, 2]
    }
);

testBillRequest(
    "Bill - Test d'échec - valeur non numérique",
    {
        "prices" : [10, "alpha"],
        "quantities" : [1, 2]
    }
);