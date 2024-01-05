import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
import pprint

def get_evetns(since, until):
    
    # DynamoDBセッションとテーブルの設定
    # テスト用のプロファイルを指定
    # session = boto3.Session(profile_name='AdministratorAccess-523736472015')    
    # dynamodb = session.resource('dynamodb', region_name='ap-northeast-1')
    
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')

    table = dynamodb.Table('schedule')

    if since is not None and until is not None:
        # 両方の条件が存在する場合
        response = table.scan(
            FilterExpression=Attr('start').gte(since) & Attr('start').lte(until)
        )
    elif since is not None:
        # ただsince条件が存在する場合
        response = table.scan(
            FilterExpression=Attr('start').gte(since)
        )
    elif until is not None:
        # ただuntil条件が存在する場合
        response = table.scan(
            FilterExpression=Attr('start').lte(until)
        )
    else:
        response = table.scan()
    
    # 取得したデータを返す
    items = response['Items']

    result = json.dumps(items, ensure_ascii=False, indent=4)

    return result


def lambda_handler(event, context):

    # クエリパラメータの取得
    query_params = event.get('queryStringParameters') or {}
    since = query_params.get('since', None)
    until = query_params.get('until', None)

    try:
        result = get_evetns(since, until)

        return {
            'statusCode': 200,
            'body': result,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }
    except Exception as e:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': str(e)}),
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }

if __name__ == '__main__':
    
    def mock_event():
        return {
            'queryStringParameters': {
                'since': '2024-01-01',
                'until': '2024-02-01'
            }
        }
    
    pprint.pprint(lambda_handler(event=mock_event(), context={}))