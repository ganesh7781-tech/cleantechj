import urllib.request
import re

urls = [
    "https://cleanbiotech.in/",
    "https://cleanbiotech.in/about-us/",
    "https://cleanbiotech.in/services/waste-management-services/"
]

for url in urls:
    try:
        html = urllib.request.urlopen(url).read().decode('utf-8')
        imgs = re.findall(r'<img.*?src=["\'](.*?)["\']', html)
        print(f"--- Images for {url} ---")
        for img in imgs:
            if "logo" not in img.lower():
                print(img)
    except Exception as e:
        print(f"Error on {url}: {e}")
