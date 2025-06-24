export default [
    {
        "/api/v1": {
        "target": "http://localhost:9999",
        "secure": false,
        "bypass": function (req, res, proxyOptions) {

	    if (req.headers.accept.includes('html')) {
            console.log('Skipping proxy for browser request.');
        return '/index.html';
        }
        
        req.headers['X-Custom-Header'] = 'yes';
    }

}

}

	];

