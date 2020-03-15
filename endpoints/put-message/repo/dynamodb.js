const aws = require('aws-sdk');

//aws.config.credentials = new aws.SharedIniFileCredentials({ profile: 'default' });

// const docClient = new aws.DynamoDB.DocumentClient({
//     accessKeyId: aws.config.credentials.accessKeyId,
//     secretAccessKey: aws.config.secretAccessKey,
//     region: aws.config.region
// });

aws.config.update({
    region: "us-east-2",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://localhost:8000"
});

const docClient = new aws.DynamoDB.DocumentClient();

export const putmessages = async (tablename, item) => {
    var params = {
        TableName: tablename,
        Item: item
    };

    try {
        const data = await docClient.put(params).promise();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw (error);
    }
};

