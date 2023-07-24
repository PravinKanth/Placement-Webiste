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
    path('delete_coordinator/', views.delete_coordinator)
]
    