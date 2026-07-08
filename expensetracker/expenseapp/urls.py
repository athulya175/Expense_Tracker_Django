from django.urls import path
from .views import ExpenseListCreateView,ExpenseDeleteView,ExpenseUpdateView,RegisterView,BudgetView,ReportsView,AIInsightsView,AskAIView

urlpatterns = [
    path('expenses/', ExpenseListCreateView.as_view(), name='expense-list'),
    path('expenses/<int:pk>/', ExpenseDeleteView.as_view(), name='expense-delete'),
    path('expenses/update/<int:pk>/', ExpenseUpdateView.as_view()),
    path('register/',RegisterView.as_view()),
    path('budget/',BudgetView.as_view()),
    path("reports/",ReportsView.as_view()),
    path("ai-insights/",AIInsightsView.as_view()),
    path("ask-ai/",AskAIView.as_view()),
]