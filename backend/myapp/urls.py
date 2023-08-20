from django.urls import path
from . import views

urlpatterns=[
    path('student/',views.student),
    path('students/',views.student_list),
    path('coordinatorlogin/',views.coordinator_login),
    path('directorlogin/',views.director_login),
    path('studentlogin/',views.student_login),
    path('studentregister/',views.student_register),
    path('registercoordinator/',views.register_coordinator),
    path('coordinators/',views.get_all_coordinators),
    path('delete_coordinator/', views.delete_coordinator),
    path('getdeptstudents/',views.get_dept_students),
    path('updatestudents/',views.update_students),
    path('getstudent/',views.get_student),
    path('placedstudents/',views.placed_students),
    path('studentsession/',views.studentsession),
    path('whoisthis/',views.whoisthis),
    path('logout/',views.logout),
    path('company/',views.company),
    path('companydetails/',views.companydetails),

]



    