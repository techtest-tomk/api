const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const express = require('express');
const cors = require('cors')

const app = express();
const port = 80;

app.use(cors());

const REGION = "eu-west-2";
const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const getItem = async () => {
  const params = {
    TableName: "tt-table",
    Key: {
      TestPK: "test1",
      TestSK: "test2",
    },
  };
  const data = await ddbDocClient.send(new GetCommand(params));
  return data.Item;
}

app.get('/', (req, res) => {
  getItem().then((item) => res.send(item)).catch((err) => res.send(err));
})

app.listen(port, () => {
  console.log(`API app listening on port ${port}`)
})