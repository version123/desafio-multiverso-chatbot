const express = require('express');
const bodyParser = require('body-parser');
 const path = require('path');
var AssistantV1 = require('watson-developer-cloud/assistant/v1');
 const app = express();
 app.use(express.static('./configs'));
app.use(bodyParser.json());

 const port = 8000;


var assistant = new AssistantV1({
  version: '2018-11-04',
  iam_apikey: 'Du6D9frRa6rJgUqL-6fzHnuDkul6Fpx8nd0_smGzHiQG',
  url: 'https://gateway-wdc.watsonplatform.net/assistant/api'
});
 // http://expressjs.com/en/4x/api.html
app.post('/conversation/', (req, res) => {
    const { text, context = {} } = req.body;
     const params = {
        input: { text },
        workspace_id: '472e8e09-db34-4917-8a01-5e8ac59f5bc4',
        context
    };
     assistant.message(params, (err, response) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
});
 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/htmls/chat.html'));
})
 app.listen(port, () => console.log(`Running on port ${port}`)) 
