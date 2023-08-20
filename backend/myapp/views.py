import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Student
from .models import Register_Coordinator
from .models import Register_Student
from .models import Company
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.sessions.backends.signed_cookies import SessionStore


@csrf_exempt
def student(request):
    if request.method == "POST" :
        try:
            roll_no = request.POST.get('roll').upper()
            first_name = request.POST.get('firstName').upper()
            degree = request.POST.get('degree').upper()
            cgpa = request.POST.get('cgpa').upper()
            passout = request.POST.get('passout').upper()
            linkedin=request.POST.get('linkedin')
            company = request.POST.get('company').upper()
            salary=request.POST.get('salary').upper()
            testimonial = request.FILES.get('testimonial')
            profile = request.FILES.get('profile')
            status="PROCESSING"
            

            try:
                existing_student = Student.objects.get(roll_no=roll_no)
                if existing_student.status=="APPROVED":
                    return HttpResponse("Exists")
            except:
                pass    
            create_student(roll_no, first_name, degree, cgpa, passout,linkedin, company, salary,testimonial, profile,status)
            
            return HttpResponse("Done!")
        except:
            return HttpResponse("Invalid JSON")
    return HttpResponse("Invalid")
@csrf_exempt
def create_student(roll_no, first_name, degree, cgpa, passout,linkedin, company,salary,testimonial, profile,status):
    try:
        existing_student = Student.objects.get(roll_no=roll_no)
        existing_student.delete()
    except ObjectDoesNotExist:
        pass

    student = Student(
        roll_no=roll_no,
        first_name=first_name,
        degree=degree,
        cgpa=cgpa,
        passout=passout,
        linkedin=linkedin,
        company=company,
        salary=salary,
        testimonial=testimonial,
        profile=profile,
        status=status

    )   
    student.save()
    return HttpResponse("Saved")
@csrf_exempt
def student_list(request):
    students = Student.objects.order_by("roll_no")
    student_data = []
    for student in students:
        profile_url = student.profile.url if student.profile else None
        testimonial_url=student.testimonial.url if student.testimonial else None
        type=Company.objects.get(companyname=student.company)

        student_data.append({
            'id': student.id,
            'roll_no': student.roll_no,
            'firstName': student.first_name,
            'degree': student.degree,
            'cgpa': student.cgpa,
            'passout': student.passout,
            'linkedin':student.linkedin,
            'company': student.company,
            'type':type.companytype,
            'salary':student.salary,
            'testimonial':testimonial_url,
            'profile': profile_url,
            'status':student.status
        })
    return JsonResponse(student_data, safe=False)



@csrf_exempt
def placed_students(request):
    placedstudents=Student.objects.filter(status="APPROVED").order_by("roll_no")
    placedstudentslist = []
    for student in placedstudents:
        profile_url = student.profile.url if student.profile else None
        testimonial_url=student.testimonial.url if student.testimonial else None
        type=Company.objects.get(companyname=student.company)

        placedstudentslist.append({
            'id': student.id,
            'roll_no': student.roll_no,
            'firstName': student.first_name,
            'degree': student.degree,
            'cgpa': student.cgpa,
            'passout': student.passout,
            'linkedin':student.linkedin,
            'company': student.company,
            'type':type.companytype,
            'salary':student.salary,
            'testimonial':testimonial_url,
            'profile': profile_url
        })
    return JsonResponse(placedstudentslist, safe=False)

@csrf_exempt
def get_dept_students(request):
    print(request.session.get("whoisthis"))
    try:
        dept=request.session.get("whoisthis")
    except:
        pass    
    students = Student.objects.filter(degree=dept).order_by("roll_no")
    student_data = []
    for student in students:
        profile_url = student.profile.url if student.profile else None
        testimonial_url=student.testimonial.url if student.testimonial else None
        type=Company.objects.get(companyname=student.company)

        student_data.append({
            'id': student.id,
            'roll_no': student.roll_no,
            'firstName': student.first_name,
            'degree': student.degree,
            'cgpa': student.cgpa,
            'passout': student.passout,
            'linkedin':student.linkedin,
            'company': student.company,
            'type':type.companytype,
            'salary':student.salary,
            'testimonial':testimonial_url,
            'profile': profile_url,
            'status':student.status
        })
    return JsonResponse(student_data, safe=False)


@csrf_exempt
def update_students(request):
    if request.method=="POST":
        roll=request.POST.get("roll")
        status=request.POST.get("status")
        try:
            student = Student.objects.get(roll_no=roll)
        except Student.DoesNotExist:
            return JsonResponse({"message": "Student not found"}, status=404)
        student.status=status.upper()
        student.save()
        return JsonResponse({"message": "Student status updated successfully"}, status=200)


@csrf_exempt
def get_student(request):
    try:    
        student = Student.objects.get(roll_no=request.session.get("roll").upper())
    except:
        return HttpResponse("Empty")    
    student_data = []
    profile_url = student.profile.url if student.profile else None
    testimonial_url=student.testimonial.url if student.testimonial else None
    type=Company.objects.get(companyname=student.company)

    student_data.append({
            'id': student.id,
            'roll_no': student.roll_no,
            'firstName': student.first_name,
            'degree': student.degree,
            'cgpa': student.cgpa,
            'passout': student.passout,
            'linkedin':student.linkedin,
            'company': student.company,
            'type':type.companytype,
            'salary':student.salary,
            'testimonial':testimonial_url,
            'profile': profile_url,
            'status':student.status
        })
    return JsonResponse(student_data, safe=False)

@csrf_exempt
def register_coordinator(request):
    if request.method=="POST":
        coordinatorname=request.POST.get("coordinatorname").upper()
        coordinatormailid=request.POST.get("coordinatormailid")
        coordinatorpassword=request.POST.get("coordinatorpassword")
        coordinatordepartment=request.POST.get("coordinatordepartment").upper()

        try:
            existing_coordinator=Register_Coordinator.objects.get(coordinatormailid=coordinatormailid)
            existing_coordinator.delete()
        except:
            pass  

        new_coordinator=Register_Coordinator(coordinatorname=coordinatorname,coordinatormailid=coordinatormailid,coordinatorpassword=coordinatorpassword,coordinatordepartment=coordinatordepartment)  
        new_coordinator.save()

        return HttpResponse("Done")
    return HttpResponse("Failed")  


@csrf_exempt
def coordinator_login(request):
    if request.method=="POST":
        try:
            coordinatormail=request.POST.get("coordinatormail")
            coordinatorpassword=request.POST.get("coordinatorpassword")

            try:
                coordinator=Register_Coordinator.objects.get(coordinatormailid=coordinatormail)
            except:
                return HttpResponse("E-Mail ID not found!")
            
            if coordinator.coordinatorpassword==coordinatorpassword:
                request.session["whoisthis"]=coordinator.coordinatordepartment  
                print(request.session.get("whoisthis")) 
                response_data={
                    "message":"Authentication Successful",
                    "name":coordinator.coordinatordepartment
                }

                return HttpResponse(json.dumps(response_data),content_type="application/json")
            else:
                return HttpResponse("Invalid credentials")
        except:
            return HttpResponse("INVALID JSON!")        
            



@csrf_exempt
def get_all_coordinators(request):
    coordinator=Register_Coordinator.objects.order_by("coordinatordepartment")
    coordinator_list=[]
    
    for i in coordinator:
        coordinator_info={
            "coordinatorname": i.coordinatorname,
            "coordinatormailid": i.coordinatormailid,
            "coordinatordepartment": i.coordinatordepartment,
            "coordinatorpassword":i.coordinatorpassword
        }
        coordinator_list.append(coordinator_info)
    return JsonResponse(coordinator_list,safe=False)





@csrf_exempt
def delete_coordinator(request):
    if request.method=="POST":
        coordinatormailid=request.POST.get("coordinatormailid")
        try:
            coordinator = Register_Coordinator.objects.get(coordinatormailid=coordinatormailid)
            coordinator.delete()
            print("done")
            return HttpResponse("Coordinator deleted successfully.") 
        
        except ObjectDoesNotExist:
            return HttpResponse("Coordinator not found.")
            


@csrf_exempt
def director_login(request):
    if request.method=="POST":
        try:
            directormail=request.POST.get("directormail")
            directorpassword=request.POST.get("directorpassword")
        except:
            return HttpResponse("None")    
        if directormail!="director@kpriet.ac.in":
            return HttpResponse("E-Mail ID not found!")

        if directormail=="director@kpriet.ac.in" and directorpassword=="director":
            request.session["whoisthis"]="director"   
            return HttpResponse("Authentication Successful")
        return HttpResponse("Invalid Credentials")


@csrf_exempt
def student_login(request):
    if request.method == "POST":
        try:
            studentloginmail = request.POST.get("studentloginmail")
            studentloginpassword = request.POST.get("studentloginpassword")

            try:
                student = Register_Student.objects.get(studentmailid=studentloginmail)
            except Register_Student.DoesNotExist:
                return HttpResponse("E-Mail ID not found!")

            if student.studentpassword == studentloginpassword:
                if request.session.session_key:
                    request.session.flush()
                request.session["whoisthis"]="Student"    
                request.session["roll"] = studentloginmail[0:7]
                request.session["firstName"] = student.studentname
                # request.session.save()


                response_data = {
                    "message": "Authentication Successful",
                    "mailid": student.studentmailid,
                    "studentname": student.studentname,
                }

                response = JsonResponse(response_data)
                response.set_cookie("hi", request.session.session_key, path="/", secure=False, httponly=False,samesite="None")

                return response
            else:
                return HttpResponse("Invalid credentials")
        except:
            return HttpResponse("INVALID JSON!")

@csrf_exempt
def student_register(request):
    if request.method=="POST":
        studentname=request.POST.get("studentregistername").upper()
        studentmailid=request.POST.get("studentregistermail")
        studentpassword=request.POST.get("studentregisterpassword")

        try:
            existing_student=Register_Student.objects.get(studentmailid=studentmailid)
            # existing_student.delete()
            return HttpResponse("Exists")
        except:
            pass  

        new_student=Register_Student(studentname=studentname,studentmailid=studentmailid,studentpassword=studentpassword)  
        new_student.save()

        return HttpResponse("Done")
    return HttpResponse("Failed")  



@csrf_exempt
def studentsession(request):
    student_data = []

    student_data.append({
        'roll':request.session.get("roll"),
        "firstName":request.session.get("firstName")
        })
    
    # my_session = SessionStore(session_key='eyJyb2xsIjoiMjBjczEyNiIsImZpcnN0TmFtZSI6IlBSQVZJTiBLQU5USCBSIn0:1qQ1ZY:l-0vDoJ-Tk78O9jt5PfaiaJb7aXppDAQyoyYfuPDkZU')
    # session_data = dict(my_session.items())
    # print(session_data)

    return JsonResponse(student_data, safe=False)

@csrf_exempt
def whoisthis(request):
    return JsonResponse({"whoisthis":request.session.get("whoisthis")},safe=False)


@csrf_exempt
def logout(request):
    if request.session.session_key:
        request.session.flush()
    return HttpResponse("Done")

@csrf_exempt
def company(request):
    if request.method=="POST":
        companyname=request.POST.get("companyname").upper()
        companytype=request.POST.get("companytype").upper()
        try:
            company_name_exist=Company.objects.get(companyname=companyname)
            return HttpResponse("Exists")
        except:
            pass
            
        save1=Company(companyname=companyname,companytype=companytype)
        save1.save()
        return HttpResponse("Done!")
   

@csrf_exempt
def companydetails(request):
        lst=[]
        for i in Company.objects.order_by("companyname"):
            lst.append({
                "companyname":i.companyname,
                "companytype":i.companytype
            })
        return JsonResponse(lst,safe=False) 
