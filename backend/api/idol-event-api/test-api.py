import requests 

url = "https://xqq7nk6999.execute-api.ap-northeast-1.amazonaws.com/dev/idolEvents"

# ヘッダでmonthを指定しない場合
def test_endpoint_reject():
    endpoint = url
    res = requests.post(endpoint)
    assert res.status_code == 403
    
    
def test_lambda_handler_with_valid_month():
    endpoint = "https://xqq7nk6999.execute-api.ap-northeast-1.amazonaws.com/dev/idolEvents?month=2023-05"
    """クエリパラメータが適切な場合のテスト"""
    res = requests.get(endpoint)
        # ステータスコードが200であることを検証
    assert res.status_code == 200
        # 応答の内容が期待通りであるかどうか、必要に応じてさらにテストを行