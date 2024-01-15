import json
import boto3
from datetime import datetime
from botocore.exceptions import ClientError
import re

def read_s3(BucketName, Prefix):
    # S3に接続
    s3 = boto3.resource('s3')
    
    # フォルダ内のjsonファイルのパスを取得
    bucket = s3.Bucket(BucketName)
    json_files = [obj for obj in bucket.objects.filter(Prefix=Prefix) if obj.key.endswith('.json')]
    
    # 最新のファイル名を取得
    latest_file = max(json_files, key=lambda x: x.last_modified)
    
    # 最新のjsonデータを取得
    data = json.loads(s3.Object(bucket.name, latest_file.key).get()['Body'].read())
    
    return data

def write_dynamodb(data, TableName):
    # DynamoDBサービスリソースを初期化
    dynamodb = boto3.resource('dynamodb')

    # 指定されたテーブルを取得
    table = dynamodb.Table(TableName)
    
    expression_attribute_names = {
        '#description': 'description',
        '#groupId': 'groupId',
        '#idolname': 'idolname',
        '#location': 'location',
        '#title': 'title'
    }

    try:
        response = table.update_item(
            Key={
                'id': data['id'],
                'start': data['start']
            },
            UpdateExpression='SET #description = :description, #groupId = :groupId, #idolname = :idolname, #location = :location, #title = :title',
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues={
                ':description': data['description'],
                ':groupId': data['groupId'],
                ':idolname': data['idolname'],
                ':location': data['location'],
                ':title': data['title']
            },
            ReturnValues="UPDATED_NEW"
        )
        return response
    except ClientError as e:
        print(e.response['Error']['Message'])
        return None

def convert_date_format(date_str):
    date = datetime.strptime(date_str, '%Y.%m.%d（%a）')
    return date.strftime('%Y-%m-%d')

def convert_urls_to_links(text):
    # URLに一致するための正規表現パターン
    url_pattern = r'(https?://\S+)'
    
    # URLを見つけて、HTMLリンクに変換
    return re.sub(url_pattern, r'<a href="\1">\1</a>', text)

def transform_event_data(event, groupid, idolname):
    # 詳細テキストに含まれるURLをリンクに変換
    linked_info = convert_urls_to_links(event.get("info", ""))

    description = f"""
日程 : {event.get("time", "")}
        
会場 : {event.get("venue", "")}

ACT : {event.get("act", "")}

詳細 : {linked_info}
"""

    new_event = {
        'id': event['id'],
        'start': convert_date_format(event['date']),
        'description': description,
        'groupId': groupid,
        'idolname': idolname,
        'location': event['venue'],
        'title': event['title']
    }

    return new_event
    

def handlers(event, context):
    BucketName = 'scraping-morimoto'
    Prefix = 'kolokol/'
    groupid = "3"
    TableName = 'schedule'
    
    # S3からデータを取得
    data = read_s3(BucketName, Prefix)
    
    transformed_events = []
    for event in data:
        transformed_events.append(transform_event_data(event, groupid, "kolokol"))
    
    # DynamoDBにデータを書き込む
    for event in transformed_events: 
        write_dynamodb(event, TableName)
    
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

if __name__ == '__main__':
    handlers(None, None)