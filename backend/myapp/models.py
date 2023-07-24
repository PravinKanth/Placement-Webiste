from django.db import models

class Student(models.Model):
    roll_no=models.CharField(max_length=7)
    first_name=models.CharField(max_length=100)
    degree=models.CharField(max_length=100)
    cgpa=models.CharField(max_length=100)
    passout=models.CharField(max_length=100)
    linkedin=models.CharField(max_length=100)
    company=models.CharField(max_length=100)
    type=models.CharField(max_length=100)
    salary=models.CharField(max_length=100)
    testimonial=models.ImageField(upload_to='testimonials/')
    profile=models.ImageField(upload_to='profiles/')

class Register_Coordinator(models.Model):
    coordinatorname=models.CharField(max_length=100)
    coordinatormailid=models.CharField(max_length=100)
    coordinatorpassword=models.CharField(max_length=100)
    coordinatordepartment=models.CharField(max_length=30)


class Register_Student(models.Model):
    studentname=models.CharField(max_length=100)
    studentmailid=models.CharField(max_length=100)
    studentpassword=models.CharField(max_length=100)   


