from django.contrib.gis import admin
from .models import Location
from leaflet.admin import LeafletGeoAdmin

admin.site.register(Location, admin.GISModelAdmin)
# admin.site.register(Location, LeafletGeoAdmin)


