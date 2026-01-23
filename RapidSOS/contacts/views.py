from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Contact

@login_required
def add_contact(request):
    if request.method == "POST":
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        relation = request.POST.get('relation')
        Contact.objects.create(
            user=request.user,
            name=name,
            phone=phone,
            relation=relation
        )
        return redirect('contact_list')  
    return render(request, 'contacts/add_contact.html')
@login_required
def contact_list(request):
    contacts = Contact.objects.filter(user=request.user)
    return render(request, 'contacts/contact_list.html', {'contacts': contacts})

@login_required
def delete_contact(request, contact_id):
    if request.method == "POST":
        contact = get_object_or_404(Contact, id=contact_id, user=request.user)
        contact.delete()
    return redirect('contact_list')