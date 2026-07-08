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
from django.db.models import Sum, Max, Avg
from collections import defaultdict
import requests
import json
import requests
from .models import Expense, Budget

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
class ReportsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        month = request.GET.get("month")
        year = request.GET.get("year")
        category = request.GET.get("category")
        search = request.GET.get("search")

        expenses = Expense.objects.filter(
            user=request.user
        )

        if month:
            expenses = expenses.filter(date__month=month)

        if year:
            expenses = expenses.filter(date__year=year)

        if category:
            expenses = expenses.filter(category=category)

        if search:
            expenses = expenses.filter(title__icontains=search)

        total = expenses.aggregate(
            total=Sum("amount")
        )["total"] or 0

        highest = expenses.aggregate(
            highest=Max("amount")
        )["highest"] or 0

        average = expenses.aggregate(
            average=Avg("amount")
        )["average"] or 0

        transactions = expenses.count()

        data = []

        for expense in expenses:
            data.append({
                "id": expense.id,
                "title": expense.title,
                "category": expense.category,
                "amount": expense.amount,
                "date": expense.date,
            })

        return Response({
            "summary": {
                "total": total,
                "highest": highest,
                "average": round(average, 2),
                "transactions": transactions,
            },
            "expenses": data,
        })


class AIInsightsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        today = timezone.now()

        month = today.month
        year = today.year

        expenses = Expense.objects.filter(
            user=request.user,
            date__month=month,
            date__year=year
        )

        budget = Budget.objects.filter(
            user=request.user,
            month=month,
            year=year
        ).first()

        total_spent = sum(float(exp.amount) for exp in expenses)

        budget_amount = float(budget.amount) if budget else 0

        remaining_budget = max(
            budget_amount - total_spent,
            0
        )

        # Highest Spending Category

        category_totals = defaultdict(float)

        for expense in expenses:
            category_totals[expense.category] += float(expense.amount)

        highest_category = "No Expenses"

        if category_totals:
            highest_category = max(
                category_totals,
                key=category_totals.get
            )

        # Financial Score

       # Financial Score

        if budget_amount == 0 and total_spent == 0:

            score = 0

        elif budget_amount == 0:

            score = 30

        else:

            percentage = (total_spent / budget_amount) * 100

            score = max(0, round(100 - percentage))

        # Status

        if budget_amount == 0 and total_spent == 0:
    
            status = "Not Started"

        elif budget_amount == 0:

            status = "No Budget"

        elif score >= 90:

            status = "Excellent"

        elif score >= 70:

            status = "Good"

        elif score >= 50:

            status = "Average"

        else:

            status = "Needs Improvement"
        # Goal Status

        if budget_amount == 0:

            goal_status = "No Budget Set"

        elif total_spent <= budget_amount:

            goal_status = "On Track"

        else:

            goal_status = "Budget Exceeded"
        #spending trends
        if month == 1:
            previous_month = 12
            previous_year = year - 1
        else:
            previous_month = month - 1
            previous_year = year

        previous_expenses = Expense.objects.filter(
            user=request.user,
            date__month=previous_month,
            date__year=previous_year
        )

        previous_total = sum(
            float(exp.amount)
            for exp in previous_expenses
)

        if previous_total == 0:
            trend = "No Previous Data"

        elif total_spent > previous_total:
            trend = "Increasing"

        elif total_spent < previous_total:
            trend = "Decreasing"

        else:
            trend = "Stable"

        # Insights
        # -------------------------------
# Insights
# -------------------------------

        transaction_count = expenses.count()

        insights = []

        # Highest Spending
        if transaction_count == 0:

            insights.append(
                "You haven't recorded any expenses yet."
            )

        else:

            insights.append(
                f"Your highest spending category is {highest_category}."
            )

        # Remaining Budget
        if budget_amount == 0:

            insights.append(
                "Set a monthly budget to receive personalized financial insights."
            )

        else:

            insights.append(
                f"You have ₹{remaining_budget:.2f} remaining in your budget."
            )

        # Budget Usage
        if budget_amount > 0:

            usage = (total_spent / budget_amount) * 100

            insights.append(
                f"You have used {usage:.0f}% of your monthly budget."
            )

        # Average Expense
        if transaction_count:

            average = total_spent / transaction_count

            insights.append(
                f"Your average expense is ₹{average:.2f}."
            )

        # Largest Expense
        largest_expense = expenses.order_by("-amount").first()

        if largest_expense:

            insights.append(
                f"Your largest expense was '{largest_expense.title}' (₹{largest_expense.amount})."
            )

        # -------------------------------
        # AI Recommendations
        # -------------------------------

        recommendations = []

        # Budget Usage Recommendation
        if budget_amount > 0:

            if percentage >= 90:
                recommendations.append(
                    "Your budget is almost exhausted. Avoid unnecessary spending for the rest of the month."
                )

            elif percentage >= 75:
                recommendations.append(
                    "You have used most of your monthly budget. Spend carefully for the remaining days."
                )

            elif percentage >= 50:
                recommendations.append(
                    "You're halfway through your budget. Continue tracking your expenses."
                )

            else:
                recommendations.append(
                    "Great job! You're managing your budget efficiently. Keep it up."
                )

        # Category Recommendation

        if highest_category == "Food":
            recommendations.append(
                "Food is your highest expense. Planning meals at home could help reduce costs."
            )

        elif highest_category == "Shopping":
            recommendations.append(
                "Consider limiting non-essential shopping to increase your savings."
            )

        elif highest_category == "Travel":
            recommendations.append(
                "Planning trips in advance can help reduce travel expenses."
            )

        elif highest_category == "Entertainment":
            recommendations.append(
                "Setting a monthly entertainment budget can help control spending."
            )

        elif highest_category == "Bills":
            recommendations.append(
                "Review your utility bills regularly for opportunities to save."
            )

        # Spending Trend Recommendation

        if trend == "Increasing":
            recommendations.append(
                "Your spending has increased compared to last month. Monitor your expenses carefully."
            )

        elif trend == "Decreasing":
            recommendations.append(
                "Great! Your spending has decreased compared to last month."
            )

        # General Recommendation

        recommendations.append(
            "Review your expenses every week to maintain healthy financial habits."
        )
                
        prompt = f"""

                You are a helpful personal finance assistant.

                Analyze this monthly financial summary.
                Total Spent: ₹{total_spent}
                Budget: ₹{budget_amount}
                Remaining Budget: ₹{remaining_budget}
                Highest Spending Category: {highest_category}
                Financial Score: {score}/100
                Goal Status: {goal_status}
                Trend: {trend}

                Return ONLY valid JSON in this format:

                {{
                    "insights": [
                        "...",
                        "...",
                        "...",
                        "..."
                    ],
                    "recommendations": [
                        "...",
                        "...",
                        "..."
                    ]
                }}
                """
        try:

            response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "llama3",
                    "prompt": prompt,
                    "stream": False
                },
                timeout=60
            )

            ollama_text = response.json()["response"]

            ai_output = json.loads(ollama_text)

            insights = ai_output["insights"]
            recommendations = ai_output["recommendations"]

        except Exception as e:

            print("Ollama Error:", e)
        return Response({

            "score": score,

            "status": status,

            "budget_remaining": remaining_budget,

            "highest_category": highest_category,

            "trend": trend,

            "goal_status": goal_status,

            "insights": insights,

            "recommendations": recommendations

        })
        
class AskAIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        question = request.data.get("question")

        today = timezone.now()

        month = today.month
        year = today.year
        expenses = Expense.objects.filter(
            user=request.user,
            date__month=month,
            date__year=year
        )

        budget = Budget.objects.filter(
            user=request.user,
            month=month,
            year=year
        ).first()

        total_spent = sum(float(exp.amount) for exp in expenses)

        budget_amount = float(budget.amount) if budget else 0

        remaining_budget = max(
            budget_amount - total_spent,
            0
        )
        category_totals = defaultdict(float)

        for expense in expenses:
            category_totals[expense.category] += float(expense.amount)

        highest_category = "-"

        if category_totals:
            highest_category = max(
                category_totals,
                key=category_totals.get
            )
        largest_expense = expenses.order_by("-amount").first()

        largest_title = "-"

        largest_amount = 0

        if largest_expense:
            largest_title = largest_expense.title
            largest_amount = largest_expense.amount
        transaction_count = expenses.count()

        average = 0

        if transaction_count:
            average = total_spent / transaction_count
        prompt = f"""
        You are an intelligent financial assistant.

        Here is the user's financial data.

        Budget: ₹{budget_amount}

        Spent: ₹{total_spent}

        Remaining Budget: ₹{remaining_budget}

        Highest Spending Category: {highest_category}

        Largest Expense: {largest_title} (₹{largest_amount})

        Average Expense: ₹{average:.2f}

        Transactions: {transaction_count}

        User Question:

        {question}

        Answer in less than 120 words.

        Be friendly, practical and specific.
        """
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            },
            timeout=60
        )

        answer = response.json()["response"]
        return Response({

            "answer": answer

        })