const path = window.location.pathname;

fetch('projects.json')
  .then(res => res.json())
  .then(data => {

    // HOME PAGE
    if (document.getElementById('gallery')) {
      const gallery = document.getElementById('gallery');

      data.forEach(project => {
        const card = document.createElement('a');
        card.href = `project.html?id=${project.id}`;
        card.className = 'project-card';

        card.innerHTML = `
          <img src="${project.cover}" loading="lazy">
          <div class="overlay">${project.title}</div>
        `;

        gallery.appendChild(card);
      });
    }

    // PROJECT PAGE
    if (path.includes('project.html')) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');

      const project = data.find(p => p.id === id);

      if (!project) return;

      document.getElementById('title').textContent = project.title;
      document.getElementById('description').textContent = project.description;
      document.getElementById('hero').src = project.hero;

      const gallery = document.getElementById('projectGallery');

      project.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        gallery.appendChild(img);
      });
    }
  });