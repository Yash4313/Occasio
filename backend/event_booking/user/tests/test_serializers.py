from django.test import TestCase
from ..serializers import RegisterSerializer
from ..models import User


class RegisterSerializerTests(TestCase):
    def setUp(self):
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'Test@1234',
            'password2': 'Test@1234',
            'phone': '+919876543210'
        }

    def test_register_serializer_valid(self):
        serializer = RegisterSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertIsInstance(user, User)
        self.assertEqual(user.username, self.user_data['username'])
        self.assertEqual(user.email, self.user_data['email'])
        self.assertTrue(user.check_password(self.user_data['password']))
        self.assertEqual(user.phone, self.user_data['phone'])

    def test_register_serializer_password_mismatch(self):
        data = self.user_data.copy()
        data['password2'] = 'Different123!'
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        # serializer should report a password error when passwords don't match
        self.assertTrue('password' in serializer.errors or 'non_field_errors' in serializer.errors)

    def test_register_serializer_missing_fields(self):
        data = {'username': '', 'email': '', 'password': '', 'password2': ''}
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
