import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
import pprint

def lambda_handler(event, context):
    # クエリパラメータの存在を確認
    try:
        year_month = event['queryStringParameters']['month']  # "2023-05"
    except (TypeError, KeyError):
        # クエリパラメータ month が見つからない場合のエラーレスポンス
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Missing or invalid parameter: month'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    
    # DynamoDBセッションとテーブルの設定
    # session = boto3.Session(profile_name='AdministratorAccess-523736472015')    
    # dynamodb = session.resource('dynamodb', region_name='ap-northeast-1')
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')
    table = dynamodb.Table('schedule')

    # DynamoDBからデータを取得
    response = table.scan(
        FilterExpression=Attr('start').begins_with(year_month)
    )

    # 取得したデータを返す
    items = response['Items']
    return {
        'statusCode': 200,
        'body': json.dumps(items, ensure_ascii=False, indent=4),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

if __name__ == '__main__':
    
    def mock_event():
        return {
            'queryStringParameters': {
                'month': '2024-01'  # 例として2024年1月を設定
            }
        }
    
    pprint.pprint(lambda_handler(event=mock_event(), context={}))