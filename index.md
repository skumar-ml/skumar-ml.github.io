---
layout: home
---

<div class="profile-container">
  <div class="profile-bio">
    <h1>Shubham Kumar</h1>
    <p>Welcome to my website! I am a third-year PhD student in the Computer Vision and Robotics Laboratory at the University of Illinois at Urbana-Champaign, advised by Prof. <a href="https://vision.ai.illinois.edu/narendra-ahuja/" target="_blank" rel="noopener noreferrer">Narendra Ahuja</a>.</p>
    <p>I want to understand how and why AI models (for any modality) fail. I believe the key to getting there is by making sense of our model's intermediate representations. I am currently at IBM this summer, under the mentorship of <a href="https://saurabhjha.one/" target="_blank" rel="noopener noreferrer">Saurabh Jha</a>.</p>
    <p>I obtained my B.S. from UCSD, where I did research with Prof. <a href="https://sites.google.com/view/ucsdvpl/home?authuser=0" target="_blank" rel="noopener noreferrer">Truong Nguyen</a> and Prof. <a href="https://jacobsschool.ucsd.edu/node/3287" target="_blank" rel="noopener noreferrer">Pamela Cosman</a>.</p>

    <div class="social-links" style="text-align: center;">
      <p style="font-size: 14px; font-family: 'Lato', Verdana, Helvetica, sans-serif;">
        <a href="mailto:{{ site.email }}">Email</a> / 
        <a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" target="_blank">LinkedIn</a> / 
        <a href="https://github.com/{{ site.github_username }}" target="_blank">GitHub</a> / 
        <a href="https://scholar.google.com/citations?user={{ site.google_scholar }}" target="_blank">Scholar</a> / 
        <a href="https://www.youtube.com/channel/{{ site.youtube_channel }}" target="_blank">YouTube</a>
      </p>
    </div>
  </div>
  <div class="profile-image">
    <img src="assets/images/profile.jpg" alt="Shubham Kumar" class="profile-pic">
  </div>
</div>

<div class="clearfix"></div>

## Recent News

{% include recent-news.html %}

## Research Highlights

{% assign sorted_projects = site.projects | where_exp: "item", "item.listed != false" | sort: "start_date" | reverse %}
<div class="research-projects">
{% for project in sorted_projects limit:2 %}
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

<p><a href="{{ '/research/' | relative_url }}">View all research &rarr;</a></p>

<!-- ## Recent Publications

{% for pub in site.publications limit:3 %}
- **{{ pub.title }}**  
  {{ pub.authors }}  
  *{{ pub.venue }}* ({{ pub.year }})  
  {% if pub.pdf %}[PDF]({{ pub.pdf }}){% endif %}
  {% if pub.code %}[Code]({{ pub.code }}){% endif %}
  {% if pub.doi %}[DOI]({{ pub.doi }}){% endif %}
{% endfor %}  -->