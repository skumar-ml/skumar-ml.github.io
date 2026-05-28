---
layout: home
---

<div class="profile-container">
  <div class="profile-bio">
    <h1>Shubham Kumar</h1>
    <p>Welcome to my website! I am a third-year PhD student in the Computer Vision and Robotics Laboratory at the University of Illinois at Urbana-Champaign. I am advised by Prof. <a href="https://vision.ai.illinois.edu/narendra-ahuja/" target="_blank" rel="noopener noreferrer">Narendra Ahuja</a>.</p>
    <p>I want to understand how and why AI models (from any modality) fail. I believe the key to understanding this is by making sense of our model's intermediate representations. I am currently interning at IBM this summer, under the mentorship of <a href="https://saurabhjha.one/" target="_blank" rel="noopener noreferrer">Saurabh Jha</a>.</p>
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

<!-- ## Research Highlights

{% assign listed_projects = site.projects | where_exp: "item", "item.listed != false" %}
{% for project in listed_projects limit:2 %}
### [{{ project.title }}]({{ project.url | relative_url }})
{{ project.excerpt }}
{% endfor %} -->

<!-- ## Recent Publications

{% for pub in site.publications limit:3 %}
- **{{ pub.title }}**  
  {{ pub.authors }}  
  *{{ pub.venue }}* ({{ pub.year }})  
  {% if pub.pdf %}[PDF]({{ pub.pdf }}){% endif %}
  {% if pub.code %}[Code]({{ pub.code }}){% endif %}
  {% if pub.doi %}[DOI]({{ pub.doi }}){% endif %}
{% endfor %}  -->