Read the codebase. Look at:
1. The news post layout template (search in src/_includes or similar for a template that renders individual news posts)
2. src/content/news/helmholtz-diabetes-conference.md to confirm front matter structure
3. style.css for existing image and layout styles

Then make these changes:

1. NEWS POST TEMPLATE — after the main body content block, add a conditional gallery section:
   - Only renders if the page has a `gallery` front matter field with items
   - Structure:
     <section class="post-gallery">
       <h2>Gallery / გალერეა</h2>
       <div class="gallery-grid">
         {% for image in gallery %}
         <a href="{{ image }}" class="glightbox">
           <img src="{{ image }}" alt="Gallery image {{ loop.index }}">
         </a>
         {% endfor %}
       </div>
     </section>
   - Add GLightbox CSS in the <head> conditionally (only when gallery exists):
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
   - Add GLightbox JS and init just before </body> conditionally:
     <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
     <script>GLightbox();</script>
   - If the template uses a base layout that controls <head> and </body>, add the conditional includes there instead

2. style.css — append at the end:
   .post-gallery { margin-top: 3rem; }
   .post-gallery h2 { margin-bottom: 1rem; font-size: 1.2rem; }
   .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 6px; }
   .gallery-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; cursor: pointer; border-radius: 3px; display: block; }
   .gallery-grid a:hover img { opacity: 0.85; }

Show me the full diff of every file you change before committing. Do not push until I confirm.