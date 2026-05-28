---
layout: page
title: Research
permalink: /research/
---

{% assign sorted_projects = site.projects | where_exp: "item", "item.listed != false" | sort: "start_date" | reverse %}
<div class="research-projects">
{% for project in sorted_projects %}
<div class="project">
  <div class="project-header">
    <h3 class="project-title"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
    {% if project.venue %}
    <span class="project-venue-badge" title="Accepted to {{ project.venue | escape }}">{{ project.venue }}</span>
    {% endif %}
  </div>

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
</div>