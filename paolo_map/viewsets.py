from rest_framework import viewsets
from rest_framework_gis import filters

from .models import Location
from .serializers import (
    MarkerSerializer,
)


class MarkerViewSet(
    viewsets.ReadOnlyModelViewSet
):
    bbox_filter_field = "location"
    filter_backends = (
        filters.InBBoxFilter,
    )
    queryset = Location.objects.all()
    serializer_class = MarkerSerializer
