from django.db import models

class Page(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=32, blank=True)

    def __str__(self):
        return f'{self.id}: {self.title}'

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=32, blank=True)
    link = models.TextField(blank=True)
    descr = models.TextField(max_length=256, blank=True)
    page = models.ForeignKey(Page, related_name="items", on_delete=models.CASCADE)
    #image = models.ImageField(upload_to='items_images', null=True, blank=True)

    def __str__(self):
        return f'{self.id}: {self.title}'