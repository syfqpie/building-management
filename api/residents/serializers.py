from django.utils.timezone import now
from django.utils.translation import gettext as _

from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from decouple import config

from .models import GenderType, Resident, TitleType


class ResidentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resident
        fields = '__all__'
        read_only_fields = ('id', 'email')


class ResidentAdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resident
        fields = [
            'id',
            'resident_no',
            'is_owner',
            'name',
            'phone_no',
            'email',
            'is_active',
            'created_at'
        ]
        read_only_fields = ('id', 'email')


class ResidentPublicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resident
        exclude = [
            'created_by',
            'is_active',
        ]
        read_only_fields = ('id', 'email')


class ResidentCustomRegisterSerializer(RegisterSerializer):
    resident_user = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField()
    title = serializers.ChoiceField(choices=TitleType.choices, allow_null=True)
    gender = serializers.ChoiceField(choices=GenderType.choices, allow_null=True)
    nric = serializers.CharField()
    phone_no = serializers.CharField()
    email = serializers.EmailField(required=False, source='username')
    password1 = serializers.HiddenField(required=False, default=config('REGISTER_DEF_PWD', ''))
    password2 = serializers.HiddenField(required=False, default=config('REGISTER_DEF_PWD', ''))

    def get_cleaned_data(self):
        # Get extra parameter
        data = {
            'username': self.validated_data.get('username', None),
            'password1': self.validated_data.get('password1', None),
            'password2': self.validated_data.get('password2', None),
            'email': self.validated_data.get('username', None),
            'name': self.validated_data.get('name', None),
            'title': self.validated_data.get('title', None),
            'gender': self.validated_data.get('gender', None),
            'nric': self.validated_data.get('nric', None),
            'phone_no': self.validated_data.get('phone_no', None)
        }

        return data

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        return email

    def save(self, request):
        # Call default first
        resident_user = super().save(request)
        resident_user.full_name = self.cleaned_data.get('name')
        
        # Instatiate creator
        creator =  request.user

        # Instantiate resident instance
        resident = Resident(
            name=self.cleaned_data.get('name'),
            title=self.cleaned_data.get('title'),
            gender=self.cleaned_data.get('gender'),
            nric=self.cleaned_data.get('nric'),
            phone_no=self.cleaned_data.get('phone_no'),
            resident_user=resident_user,
            email=resident_user.email,
            created_by=creator
        )

        # Saving all instances
        resident_user.save()
        resident.save()

        return resident_user
