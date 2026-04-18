fetch('projects.json')
    .then(res => res.json())
    .then(data => {
      const gallery = document.getElementById('gallery');

      data.forEach((project, index) => {

        const row = document.createElement('div');
        row.className = 'project-row';

        if (index % 2 !== 0) row.classList.add('reverse');

        row.innerHTML = `
        <a href="project.html?id=${project.id}" class="project-img">
          <img src="${project.cover}" loading="lazy">
        </a>

        <div class="project-info">
          <div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
        </div>
      `;

        gallery.appendChild(row);
      });
    });