---
layout: page
title: Publications
permalink: /publications/
---

# Publications

## Journal Articles

{% assign journal_papers = site.publications | where: "type", "journal" | sort: "year" | reverse %}
{% for paper in journal_papers %}
- **{{ paper.title }}**  
  {{ paper.authors }}  
  *{{ paper.venue }}* ({{ paper.year }})  
  {% if paper.pdf %}[PDF]({{ paper.pdf }}){% endif %}
  {% if paper.code %}[Code]({{ paper.code }}){% endif %}
  {% if paper.doi %}[DOI]({{ paper.doi }}){% endif %}
{% endfor %}

## Conference Papers

{% assign conference_papers = site.publications | where: "type", "conference" | sort: "year" | reverse %}
{% for paper in conference_papers %}
- **{{ paper.title }}**  
  {{ paper.authors }}  
  *{{ paper.venue }}* ({{ paper.year }})  
  {% if paper.pdf %}[PDF]({{ paper.pdf }}){% endif %}
  {% if paper.code %}[Code]({{ paper.code }}){% endif %}
  {% if paper.doi %}[DOI]({{ paper.doi }}){% endif %}
{% endfor %}

## Preprints

{% assign preprints = site.publications | where: "type", "preprint" | sort: "year" | reverse %}
{% for paper in preprints %}
- **{{ paper.title }}**  
  {{ paper.authors }}  
  *{{ paper.venue }}* ({{ paper.year }})  
  {% if paper.pdf %}[PDF]({{ paper.pdf }}){% endif %}
  {% if paper.code %}[Code]({{ paper.code }}){% endif %}
  {% if paper.url %}[URL]({{ paper.url }}){% endif %}
{% endfor %}

## Theses

{% assign theses = site.publications | where: "type", "thesis" | sort: "year" | reverse %}
{% for paper in theses %}
- **{{ paper.title }}**  
  {{ paper.authors }}  
  *{{ paper.venue }}* ({{ paper.year }})  
  {% if paper.pdf %}[PDF]({{ paper.pdf }}){% endif %}
  {% if paper.url %}[URL]({{ paper.url }}){% endif %}
{% endfor %} 