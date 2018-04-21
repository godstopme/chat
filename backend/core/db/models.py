from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from . import fields
from .. import utils


class UniqueSlugModelMixin(models.Model):
    class Meta:
        abstract = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.slug_fields = self.collect_slug_fields()
        self.generate_unique_slugs()

        return super().save(*args, **kwargs)

    def generate_unique_slugs(self):
        actual_self_class = utils.meta.first_base_model(UniqueSlugModelMixin, self)
        qs = actual_self_class.objects.exclude(id=self.id)

        for slug_field in self.slug_fields:
            slug_value = getattr(self, slug_field.attname, None) or getattr(self, slug_field.slug_field, None)

            assert slug_value is not None, 'slug_value of SlugField can\'t be None'

            self.generate_unique_slug(slug_field, slug_value, qs)

    def generate_unique_slug(self, slug_field, slug_value, qs):
        slug_value = utils.text.slugify(slug_value)
        slug_field_name = slug_field.attname
        i = 0

        while True:
            try:
                qs.get(**{slug_field_name: slug_value})
            except ObjectDoesNotExist:
                setattr(self, slug_field_name, slug_value)

                return
            else:
                i += 1
                slug_value = f'{slug_value.rsplit("-", 1)[0]}-{i}'

    def collect_slug_fields(self):
        def is_slug_field(field):
            return isinstance(field, fields.SlugField)

        return list(filter(is_slug_field, self._meta.get_fields()))
