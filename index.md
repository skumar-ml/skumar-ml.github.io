---
layout: home
---

<div class="profile-container">
  <div class="profile-bio">
    <h1>Shubham Kumar</h1>
    <p>Hi there! I am a second-year PhD student in the Computer Vision and Robotics Laboratory at the University of Illinois at Urbana-Champaign. I am advised by Prof. Narendra Ahuja.</p>
    <p>I want to understand how computer vision models see and understand the world. Most recently, I have been working on concept-based explainability.</p>
    <p>I obtained my B.S. from UCSD, where I did research with Prof. Truong Nguyen and Prof. Pamela Cosman.</p>
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

<div class="compact-news" style="margin-bottom: 20px;">
  <ul>
  {% assign sorted_news = site.news | sort: 'date' | reverse %}
  {% for news_item in sorted_news limit:5 %}
    <li><strong>{{ news_item.date | date: "%m/%Y" }}</strong>: {{ news_item.content | strip_html | strip }}</li>
  {% endfor %}
  </ul>
</div>

<!-- ## Research Highlights

{% for project in site.projects limit:2 %}
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