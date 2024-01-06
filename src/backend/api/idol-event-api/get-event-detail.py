import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
import pprint


def lambda_handler(event, context):
    
    eventid = event['pathParameters']['eventid']

    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')
    table = dynamodb.Table('schedule')

    # DynamoDBからイベントIDに対応するデータを取得
    try:
        response = table.query(
            KeyConditionExpression=Key('id').eq(eventid)
        )
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps('Error while fetching data from DynamoDB'),
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }

    # レスポンスがItemを含む場合、データを返す
    if 'Items' in response:
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'], ensure_ascii=False, indent=4),
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }
    else:
        return {
            'statusCode': 404,
            'body': json.dumps('Event not found'),
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }
        
if __name__ == "__main__":
    event = {
        'pathParameters': {
            'eventid': '4io0p3ogu7luauavdcmneffcad'
        }
    }
    context = {}
    pprint.pprint(lambda_handler(event, context))