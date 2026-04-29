import os
import glob

files = glob.glob('*.html')
logo = '<img src="http://cleanbiotech.in/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-19-at-4.36.10-PM-1.jpeg.webp" alt="Clean Biotech Logo" style="height: 50px; display: block;">'

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        content = content.replace('<span class="logo-text">Clean<span class="logo-highlight">Biotech</span></span>', logo)
        content = content.replace('<span class="logo-text text-white">Clean<span class="logo-highlight">Biotech</span></span>', logo)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
            
        print(f'Updated {f}')
    except Exception as e:
        print(f'Error on {f}: {e}')
