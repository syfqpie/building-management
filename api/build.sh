#!/usr/bin/env bash
# Exit on error
set -o errexit

pipenv install
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate

pipenv run python manage.py createsuperuser --noinput
