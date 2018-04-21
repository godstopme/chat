from django.utils.text import slugify as django_slugify
from unidecode import unidecode


def slugify(text):
    return django_slugify(unidecode(text))
