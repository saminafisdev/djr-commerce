import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from store.models import Category, Product


class Command(BaseCommand):
    help = "Load data from JSON files into the database"

    def handle(self, *args, **kwargs):
        self.load_categories()
        self.load_products()

    def load_categories(self):
        file_path = os.path.join(settings.BASE_DIR, "data/categories.json")
        with open(file_path, "r") as file:
            categories = json.load(file)
            for category_data in categories:
                Category.objects.create(**category_data)
        self.stdout.write(self.style.SUCCESS("Successfully loaded categories"))

    def load_products(self):
        file_path = os.path.join(settings.BASE_DIR, "data/products.json")
        with open(file_path, "r") as file:
            products = json.load(file)
            for product_data in products:
                category_id = product_data.pop("category")
                category = Category.objects.get(id=category_id)
                Product.objects.create(category=category, **product_data)
        self.stdout.write(self.style.SUCCESS("Successfully loaded products"))
