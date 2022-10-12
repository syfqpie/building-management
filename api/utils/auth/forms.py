from django.contrib.sites.shortcuts import get_current_site

from allauth.account import app_settings
from allauth.account.adapter import get_adapter
from allauth.account.forms import default_token_generator
from allauth.account.utils import user_pk_to_url_str, user_username

from dj_rest_auth.forms import AllAuthPasswordResetForm


class MyResetPasswordForm(AllAuthPasswordResetForm):
    """
    Override AllAuthPasswordResetForm
    Add custom implementation here
    """

    def save(self, request, **kwargs):
        """
        Send reset password email implementation
        """

        current_site = get_current_site(request)
        email = self.cleaned_data['email']
        token_generator = kwargs.get('token_generator', default_token_generator)

        for user in self.users:
            temp_key = token_generator.make_token(user)

            # send the password reset email
            url = f'https://{current_site.domain}auth/reset?uid={user_pk_to_url_str(user)}&key={temp_key}'
            
            # Set context
            context = {
                'current_site': current_site,
                'user': user,
                'password_reset_url': url,
                'request': request,
            }

            if app_settings.AUTHENTICATION_METHOD != app_settings.AuthenticationMethod.EMAIL:
                context['username'] = user_username(user)

            get_adapter(request).send_mail(
                'account/email/password_reset_key', email, context
            )

        return self.cleaned_data['email']
