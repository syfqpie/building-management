from django.conf import settings
from allauth.account.adapter import DefaultAccountAdapter
from allauth.account import app_settings
from django.contrib.sites.shortcuts import get_current_site
from decouple import config
from django.utils.encoding import force_str

from core.settings import EMAIL_SUBJECT_PREFIX

from .models import UserType


class MyAccountAdapter(DefaultAccountAdapter):

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        activate_url = self.get_email_confirmation_url(request, emailconfirmation)
        current_user = emailconfirmation.email_address.user
        ctx = {
            'user': emailconfirmation.email_address.user,
            'activate_url': activate_url,
            'current_site': current_site,
            'key': emailconfirmation.key,
            'verification_url': '{}verify-email?key={}'.format(current_site.domain, emailconfirmation.key)
        }

        print(current_user.user_type)

        if current_user.user_type == UserType.PUBLIC:
            # sponsored_job_application = JobApplication.objects.filter(candidate__user__id=current_user.id).values('sponsored_employer__company__name', 'position__title')[0]
            ctx['verification_url'] = '{}verify-email-renter?key={}'.format(current_site.domain, emailconfirmation.key)
            if signup:
                email_template = "account/email/renter_email_confirmation_signup"
            else:
                email_template = "account/email/renter_email_confirmation"
        else:
            if signup:
                email_template = 'account/email/email_confirmation_signup'
            else:
                email_template = 'account/email/email_confirmation'

        self.send_mail(email_template, emailconfirmation.email_address.email, ctx)

    def format_email_subject(self, subject):
        prefix = app_settings.EMAIL_SUBJECT_PREFIX
        forced_str = force_str(subject)
        
        if prefix is None:
            site = get_current_site(self.request)
            prefix = '[{name}] '.format(name=site.name)

        return forced_str