from rest_framework import serializers
from .models import Expense,Budget
from django.contrib.auth.models import User

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Expense
        fields='__all__'

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
    def create(self, validated_data):
        user=User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model=Budget
        fields="__all__"
        read_only_fields=["User"] #The frontend cannot send or change the user field.


