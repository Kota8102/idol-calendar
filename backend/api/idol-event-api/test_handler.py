import json
import unittest
from unittest.mock import MagicMock, patch
from handler import lambda_handler

class TestLambdaHandler(unittest.TestCase):
    def test_lambda_handler_with_valid_month(self):
        event = {
            'queryStringParameters': {
                'month': '2023-05'
            }
        }
        context = MagicMock()
        table_mock = MagicMock()
        table_mock.scan.return_value = {
            'Items': [
                {'id': '1', 'start': '2023-05-01', 'end': '2023-05-02', 'name': 'Event 1'},
                {'id': '2', 'start': '2023-05-03', 'end': '2023-05-04', 'name': 'Event 2'}
            ]
        }
        dynamodb_mock = MagicMock()
        dynamodb_mock.resource.return_value = table_mock
        with patch('boto3.resource', return_value=dynamodb_mock):
            response = lambda_handler(event, context)
        
        self.assertEqual(response['statusCode'], 200)
        self.assertEqual(response['body'], json.dumps([
            {'id': '1', 'start': '2023-05-01', 'end': '2023-05-02', 'name': 'Event 1'},
            {'id': '2', 'start': '2023-05-03', 'end': '2023-05-04', 'name': 'Event 2'}
        ], ensure_ascii=False, indent=4))
        self.assertEqual(response['headers'], {'Content-Type': 'application/json'})

    def test_lambda_handler_with_missing_month(self):
        event = {}
        context = MagicMock()
        response = lambda_handler(event, context)
        
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], json.dumps({'message': 'Missing or invalid parameter: month'}))
        self.assertEqual(response['headers'], {'Content-Type': 'application/json'})

    def test_lambda_handler_with_invalid_month(self):
        event = {
            'queryStringParameters': {
                'month': '2023-13'
            }
        }
        context = MagicMock()
        response = lambda_handler(event, context)
        
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], json.dumps({'message': 'Missing or invalid parameter: month'}))
        self.assertEqual(response['headers'], {'Content-Type': 'application/json'})

if __name__ == '__main__':
    unittest.main()