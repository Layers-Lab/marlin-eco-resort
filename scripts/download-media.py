import json,urllib.request,pathlib
assets=json.load(open('instagram-assets.json'))
for i,url in enumerate(assets['images']):
    urllib.request.urlretrieve(url, f'public/images/marlin-{i+1}.jpg')
for name,photo in [('coast','photo-1514282401047-d79a71a590e8'),('palms','photo-1506953823976-52e1fdc0149a'),('sea','photo-1518837695005-2083093ee35b')]:
    urllib.request.urlretrieve(f'https://images.unsplash.com/{photo}?auto=format&fit=crop&w=2200&q=85',f'public/images/{name}.jpg')
