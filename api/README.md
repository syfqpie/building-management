# Building Management API 🏢

Manage building with ease

## Preview

To be updated

## Installation

Create virtual environment

```bash
  virtualenv env --python=python3 --copies
```

Get into your created virtual environment - Windows

```bash
  env\Scripts\activate
```

Get into your created virtual environment - Mac / Ubuntu

```bash
  source env/bin/activate
```

Install all packages from requirements.txt

```bash
  pip install -r requirements.txt
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
