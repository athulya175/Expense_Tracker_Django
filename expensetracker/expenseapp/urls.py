from django.urls import path
from .views import ExpenseListCreateView,ExpenseDeleteView,ExpenseUpdateView

urlpatterns = [
    path('expenses/', ExpenseListCreateView.as_view(), name='expense-list'),
    path('expenses/<int:pk>/', ExpenseDeleteView.as_view(), name='expense-delete'),
    path('expenses/update/<int:pk>/', ExpenseUpdateView.as_view()),
]