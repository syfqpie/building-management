import uuid
import os
import re

from django.utils.deconstruct import deconstructible
from django_filters.rest_framework import DjangoFilterBackend
from djangorestframework_camel_case.parser import CamelCaseJSONParser

from drf_yasg import openapi
from drf_yasg.app_settings import swagger_settings
from drf_yasg.inspectors import CoreAPICompatInspector, FieldInspector, NotHandled, SwaggerAutoSchema
from rest_framework.pagination import PageNumberPagination

@deconstructible
class PathAndRename(object):
    """
    Rename file name to have a formatted file name
    """
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # set filename as random string
        filename_ = uuid.uuid4().hex
        filename = '{}.{}'.format(filename_, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)

# Documentation
class DjangoFilterDescriptionInspector(CoreAPICompatInspector):
    def get_filter_parameters(self, filter_backend):
        if isinstance(filter_backend, DjangoFilterBackend):
            result = super(DjangoFilterDescriptionInspector, self).get_filter_parameters(filter_backend)
            for param in result:
                if not param.get('description', ''):
                    param.description = "Filter the returned list by {field_name}".format(field_name=param.name)

            return result

        return NotHandled

class NoUnderscoreBeforeNumberCamelCaseJSONParser(CamelCaseJSONParser):
    json_underscoreize = { 'no_underscore_before_number': True }

class NoSchemaTitleInspector(FieldInspector):
    def process_result(self, result, method_name, obj, **kwargs):
        # remove the `title` attribute of all Schema objects
        if isinstance(result, openapi.Schema.OR_REF):
            # traverse any references and alter the Schema object in place
            schema = openapi.resolve_ref(result, self.components)
            schema.pop('title', None)

            # no ``return schema`` here, because it would mean we always generate
            # an inline `object` instead of a definition reference

        # return back the same object that we got - i.e. a reference if we got a reference
        return result

class NoTitleAutoSchema(SwaggerAutoSchema):
    field_inspectors = [NoSchemaTitleInspector] + swagger_settings.DEFAULT_FIELD_INSPECTORS

class ResultsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    ordering = ['-added_on']

def dict_snake_to_camel(payload_dict):
    reg = re.compile(r'_([a-z])')
    for key in list(payload_dict):
        new_key = reg.sub(lambda k: k.group(1).upper(), key)
        payload_dict[new_key] = payload_dict.pop(key)
    
    return payload_dict

def dict_camel_to_snake(payload_dict):
    for key in list(payload_dict):
        new_key = re.sub(r'(?<!^)(?=[A-Z])', '_', key).lower()
        payload_dict[new_key] = payload_dict.pop(key)
    
    return payload_dict

def camel_to_capitalize(payload):
    return payload.replace('_', ' ').capitalize()