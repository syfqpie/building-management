# Building Management API 🏢

Manage building with ease

## Requirements

* Python 3.10+
* pipenv

## Installation

Install dependencies

```bash
  # only on mac / linux, run this to make it executable
  chmod +x ./scripts/init-api
  # install
  ./scripts/init-api
```

Get into your created virtual environment

```bash
  pipenv shell
```

Make migrations

```bash
  python manage.py makemigrations
```

Migrate the migrations

```bash
  python manage.py migrate
```

Create superuser

```bash
  python manage.py createsuperuser
```

Run the django rest framework

```bash
  python manage.py runserver
```

## References

[Django REST Framework](https://www.django-rest-framework.org)
