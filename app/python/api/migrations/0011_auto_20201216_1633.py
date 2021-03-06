# Generated by Django 3.1.4 on 2020-12-16 16:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20201216_1629'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='page',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='api.page'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='page',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
