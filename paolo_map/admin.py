from django.contrib.gis import admin
from .models import Location
#
@admin.register(Location)
class MarkerAdmin(admin.GISModelAdmin):
    list_display = ("name", "location")

# from leaflet.admin import LeafletGeoAdmin
#
#
# # @admin.register(Location)
# # class MarkerAdmin(LeafletGeoAdmin):
# #     list_display = ("name", "location")
#
# admin.site.register(Location, LeafletGeoAdmin)
# # from django.contrib import admin
