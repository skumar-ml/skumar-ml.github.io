---
layout: page
title: Research
permalink: /research/
---

# Research Projects

{% assign sorted_projects = site.projects | sort: "start_date" | reverse %}
{% for project in sorted_projects %}
<div class="project">
  <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>

  {% if project.image %}
  <a href="{{ project.url | relative_url }}">
    <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" class="project-image">
  </a>
  {% endif %}

  <div class="project-content">
    {{ project.description | default: project.excerpt }}
    <p><a href="{{ project.url | relative_url }}">View project &rarr;</a></p>
  </div>

  {% if project.links %}
  <div class="project-links">
    {% for link in project.links %}
    <a href="{{ link.url }}" class="project-link" target="_blank" rel="noopener noreferrer">{{ link.name }}</a>
    {% endfor %}
  </div>
  {% endif %}
</div>
{% endfor %}