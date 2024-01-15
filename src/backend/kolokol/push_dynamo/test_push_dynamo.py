import json
import pytest
import boto3
from moto import mock_s3
from backend.kolokol.push_dynamo.main import convert_date_format, convert_urls_to_links, read_s3


def test_convert_date_format():
    assert convert_date_format("2024.01.14（Mon）") == "2024-01-14"

def test_convert_urls_to_links():
    text = "Check out this link: https://example.com"
    expected = 'Check out this link: <a href="https://example.com">https://example.com</a>'
    assert convert_urls_to_links(text) == expected

@mock_s3
def setup_s3(bucket_name, prefix, file_content):
    # S3サービスをモック
    s3 = boto3.resource('s3', region_name='us-east-1')
    s3.create_bucket(Bucket=bucket_name)

    # テスト用のファイルをバケットにアップロード
    s3_object = s3.Object(bucket_name, f"{prefix}/test.json")
    s3_object.put(Body=json.dumps(file_content))

    return s3_object

@mock_s3
def test_read_s3():
    # テスト用のバケット名とプレフィックス
    bucket_name = "test-bucket"
    prefix = "test-prefix"

    # テスト用のデータ
    test_data = {"key": "value"}

    # S3のモック環境をセットアップ
    setup_s3(bucket_name, prefix, test_data)

    # テスト実行
    result = read_s3(bucket_name, prefix)

    # 結果検証
    assert result == test_data


def test_convert_urls_to_links_with_no_url():
    text = "これはテストテキストです。URLは含まれていません。"
    assert convert_urls_to_links(text) == text

def test_convert_urls_to_links_with_single_url():
    text = "このテキストにはURLが含まれています: https://example.com"
    expected = 'このテキストにはURLが含まれています: <a href="https://example.com">https://example.com</a>'
    assert convert_urls_to_links(text) == expected

def test_convert_urls_to_links_with_multiple_urls():
    text = "複数のURLが含まれています: https://example.com そして https://example.org"
    expected = '複数のURLが含まれています: <a href="https://example.com">https://example.com</a> そして <a href="https://example.org">https://example.org</a>'
    assert convert_urls_to_links(text) == expected