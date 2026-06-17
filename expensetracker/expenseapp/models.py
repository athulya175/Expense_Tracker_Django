from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Expense(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)
    date = models.DateField()
    description = models.TextField(blank=True)
   
    def __str__(self):
        return self.title

class Budget(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    month = models.IntegerField(
        default=timezone.now().month
    )

    year = models.IntegerField(
        default=timezone.now().year
    )

    class Meta:
        unique_together = ("user", "month", "year")
    def __str__(self):
        return f"{self.user.username} - {self.month}/{self.year} - ₹{self.amount}"
