---
layout: page
title: Blog
permalink: /blog/
---

# Blog

<div class="blog-posts">
  {% for post in site.posts %}
  <div class="post">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
    
    <div class="post-excerpt">
      {{ post.excerpt }}
    </div>
    
    <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
  </div>
  {% endfor %}
</div> 