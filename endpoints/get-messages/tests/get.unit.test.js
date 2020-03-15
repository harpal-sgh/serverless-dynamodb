import { getmessages } from '../repo/dynamodb';
import { get} from '../get';
import chai from 'chai';
import sinon from 'sinon';
import aws from 'aws-sdk';

const sandbox = sinon.createSandbox();
const expect = chai.expect;
let event, context;

describe('test lambda get', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('get lambda should return success', async () => {
        // Mock
        const result = { Items:
            [ { messagebody: 'message 33 body',
                user_id: 13,
                subject: 'message 33',
                isread: true,
                message_id: 33,
                messagefor: 'inbox',
                created_date: '2020-03-14T20:20:54.123Z',
                'messagefor-created_date': 'inbox-2020-03-14T20:20:54.123Z' } ],
           Count: 1,
           ScannedCount: 1 };

        let a = sandbox.stub(getmessages, 'async').resolves(result);
        //sandbox.spy(getmessages)
        // Act
        let response = await get(event, context);
        expect(response.statusCode).equal(200);
        //sinon.assert.calledOnce(getmessages);
        //sinon.assert.calledWith(a, { });
        // Assert
        //a.restore();
        //getmessages.restore();
       // sinon.assert.calledOnce(getmessages);
        // expect(response.statusCode).equal(200);
        // const actual = { id: '1', name: 'Go to gym'};
        //expect(response.body).equal(JSON.stringify(actual));
    });
});