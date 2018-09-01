from django.db import models


class SlugField(models.SlugField):
    def __init__(self, slug_field=None, *args, **kwargs):
        assert slug_field, f"invalid value for 'slug_field' argument: {slug_field}"

        self.slug_field = slug_field

        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()

        if self.slug_field is not None:
            kwargs['slug_field'] = self.slug_field

        return name, path, args, kwargs
