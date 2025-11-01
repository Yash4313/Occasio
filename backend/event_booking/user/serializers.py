from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 'phone', 'role']

    def create(self, validated_data):
        # Remove password2 from validated_data before creating user
        validated_data.pop('password2', None)
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def validate(self, attrs):
        # ensure password and password2 match
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError({
                'password': "Password fields didn't match.",
            })
        return attrs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone', 'role']
