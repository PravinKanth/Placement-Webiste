import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Student
from .models import Register_Coordinator
from .models import Register_Student
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist

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
            type = request.POST.get('type').upper()
            salary=request.POST.get('salary').upper()
            testimonial = request.FILES.get('testimonial')
            profile = request.FILES.get('profile')
            
            print(profile)
            print(request.FILES)
            create_student(roll_no, first_name, degree, cgpa, passout,linkedin, company,type, salary,testimonial, profile)
            
            return HttpResponse("Done!")
        except:
            return HttpResponse("Invalid JSON")
    return HttpResponse("Invalid")

def create_student(roll_no, first_name, degree, cgpa, passout,linkedin, company,type,salary,testimonial, profile):
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
        type=type,
        salary=salary,
        testimonial=testimonial,
        profile=profile
    )   
    student.save()
    print("saved")
    return HttpResponse("Saved")

def student_list(request):
    students = Student.objects.order_by("roll_no")
    student_data = []
    for student in students:
        profile_url = student.profile.url if student.profile else None
        testimonial_url=student.testimonial.url if student.testimonial else None

        student_data.append({
            'id': student.id,
            'roll_no': student.roll_no,
            'firstName': student.first_name,
            'degree': student.degree,
            'cgpa': student.cgpa,
            'passout': student.passout,
            'linkedin':student.linkedin,
            'company': student.company,
            'type':student.type,
            'salary':student.salary,
            'testimonial':testimonial_url,
            'profile': profile_url,
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
    # print(JsonResponse(coordinator_list))
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
            print("Not")
            return HttpResponse("Coordinator not found.")
            


@csrf_exempt
def director_login(request):
    if request.method=="POST":
        try:
            directormail=request.POST.get("directormail")
            directorpassword=request.POST.get("directorpassword")
        except:
            return HttpResponse("None")    
        if directormail!="admin":
            return HttpResponse("E-Mail ID not found!")

        if directormail=="admin" and directorpassword=="admin":
            return HttpResponse("Authentication Successful")
        return HttpResponse("Invalid Credentials")



@csrf_exempt
def student_login(request):
    if request.method=="POST":
        try:
            studentloginmail=request.POST.get("studentloginmail")
            studentloginpassword=request.POST.get("studentloginpassword")

            try:
                student=Register_Student.objects.get(studentmailid=studentloginmail)
            except:
                return HttpResponse("E-Mail ID not found!")
            
            if student.studentpassword==studentloginpassword:
                response_data={
                    "message":"Authentication Successful",
                    "mailid":student.studentmailid,
                    "studentname":student.studentname
                }

                return HttpResponse(json.dumps(response_data),content_type="application/json")
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
            existing_student.delete()
        except:
            pass  

        new_student=Register_Student(studentname=studentname,studentmailid=studentmailid,studentpassword=studentpassword)  
        new_student.save()

        return HttpResponse("Done")
    return HttpResponse("Failed")  
