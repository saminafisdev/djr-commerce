# Generated by Django 5.1.5 on 2025-04-05 10:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_alter_order_status_alter_wishlistitem_wishlist'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='status',
            new_name='payment_status',
        ),
    ]
