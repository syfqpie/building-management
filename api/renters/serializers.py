from django.utils.timezone import now
from django.utils.translation import gettext as _

# from allauth.account import app_settings
from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from .models import Renter, TitleType


class RenterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Renter
        fields = '__all__'
        read_only_fields = ('email', 'id')


class RenterPublicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Renter
        exclude = [
            'moved_out_at',
            'deactivated_at',
            'created_by',
            'is_active',
        ]
        read_only_fields = ('email', 'id')


class RenterCustomRegisterSerializer(RegisterSerializer):
    renter_user = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField()
    title = serializers.ChoiceField(choices=TitleType.choices)
    nric = serializers.CharField()
    phone_number = serializers.CharField()
    email = serializers.EmailField()

    def get_cleaned_data(self):
        data = super(RenterCustomRegisterSerializer, self).get_cleaned_data()

        # Get extra parameter
        extra_data = {
            'name': self.validated_data.get('name', None),
            'title': self.validated_data.get('title', None),
            'nric': self.validated_data.get('nric', None),
            'phone_number': self.validated_data.get('phone_number', None),
            'email': self.validated_data.get('email', None)
        }

        data.update(extra_data)
        return data

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        return email

    def save(self, request):
        renter_user = super(RenterCustomRegisterSerializer, self).save(request)
        renter_user.username = renter_user.email

        # Instatiate Creator
        creator =  request.user

        # Instantiate Renter instance
        renter = Renter(
            name=self.cleaned_data.get('name'),
            title=self.cleaned_data.get('title'),
            nric=self.cleaned_data.get('nric'),
            phone_number=self.cleaned_data.get('phone_number'),
            renter_user=renter_user,
            email=renter_user.email,
            created_by=creator
        )

        renter_user.save()
        renter.save()

        return renter_user
