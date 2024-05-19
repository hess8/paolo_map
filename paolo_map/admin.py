from django.contrib.gis import admin
from .models import Marker
#
# @admin.register(Marker)
# class MarkerAdmin(admin.GISModelAdmin):
#     list_display = ("name", "location")

from leaflet.admin import LeafletGeoAdmin

@admin.register(Marker)
class MarkerAdmin(LeafletGeoAdmin):
    list_display = ("name", "location")


# from django.contrib import admin
