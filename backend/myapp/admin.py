from django.contrib import admin
from .models import Student
from .models import Register_Coordinator
from .models import Register_Student

# Register your models here.

admin.site.register(Student)
admin.site.register(Register_Coordinator)
admin.site.register(Register_Student)

