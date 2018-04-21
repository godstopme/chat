from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet


class GenericApiViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]
    actions_serializers = dict()

    def get_serializer_class(self):
        try:
            return self.actions_serializers[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()
