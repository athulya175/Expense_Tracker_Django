from django.shortcuts import render
from datetime import date
from rest_framework.generics import ListCreateAPIView,DestroyAPIView,RetrieveUpdateAPIView,CreateAPIView
from .models import Expense,Budget
from .serializer import ExpenseSerializer,RegisterSerializer,BudgetSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone

class ExpenseListCreateView(ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        selected_date = self.request.GET.get("date")

        queryset = Expense.objects.filter(
            user=self.request.user
        )

        if selected_date:
            queryset = queryset.filter(
                date=selected_date
            )
        else:
            today=timezone.now()
            queryset=queryset.filter(
                date__month=today.month,
                date__year=today.year
            )
        return queryset

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )
class ExpenseDeleteView(DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(
            user=self.request.user
        )

class ExpenseUpdateView(RetrieveUpdateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(
            user=self.request.user
        )
    
class RegisterView(CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer

class BudgetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today=timezone.now()
        budget = Budget.objects.filter(
            user=request.user,
            month=today.month,
            year=today.year
        ).first()

        if budget:
            return Response({
                "amount": budget.amount
            })

        return Response({
            "amount": 0
        })

    def post(self, request):
        today=timezone.now()
        amount = request.data.get("amount")

        budget, created = Budget.objects.get_or_create(
            user=request.user,
            month=today.month,
            year=today.year,
            defaults={"amount": amount}
        )

        if not created:
            budget.amount = amount
            budget.save()

        return Response({
            "message": "Budget saved successfully"
        })