from django.db import models

from core.db.models import UniqueSlugModelMixin
from core.db import fields


class ChatRoom(UniqueSlugModelMixin):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    slug = fields.SlugField(slug_field='name', db_index=True, max_length=1024)
