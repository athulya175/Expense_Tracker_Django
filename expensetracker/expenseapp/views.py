from django.shortcuts import render
from datetime import date
# Create your views here.
from rest_framework.generics import ListCreateAPIView,DestroyAPIView,RetrieveUpdateAPIView
from .models import Expense
from .serializer import ExpenseSerializer

class ExpenseListCreateView(ListCreateAPIView):
    queryset=Expense.objects.all()
    serializer_class=ExpenseSerializer
    def get_queryset(self):
        selected_date = self.request.GET.get("date")

        if selected_date:
            return Expense.objects.filter(date=selected_date)

        return Expense.objects.filter(date=date.today())
class ExpenseDeleteView(DestroyAPIView):
    queryset = Expense.objects.all()

class ExpenseUpdateView(RetrieveUpdateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer