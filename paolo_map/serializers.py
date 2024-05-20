from rest_framework_gis.serializers import (
    GeoFeatureModelSerializer,
)

from .models import Location


class MarkerSerializer(
    GeoFeatureModelSerializer
):
    class Meta:
        fields = ("id", "name")
        geo_field = "location"
        model = Location