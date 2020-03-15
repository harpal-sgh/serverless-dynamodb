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

export const getmessages =  async (userid, tablename, box, isread, pagesize) => {
        console.log('db called');
        var params = {
            TableName: tablename,
            IndexName: "gsi-index",
            Limit: pagesize,
            KeyConditionExpression: "user_id= :userid and begins_with(#sk, :messagefor)",
            ExpressionAttributeNames: {
                "#sk": "messagefor-created_date"
            },
            //FilterExpression: "isread= :isread",
            ExpressionAttributeValues: {
                ":userid": userid,
                ":messagefor": box,
                //   ":isread": isread
            },
            ScanIndexForward: false,  //true: ascending | false: descending
        };

        try {
            const data = await docClient.query(params).promise();
            //console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            throw (error);
        }
    };