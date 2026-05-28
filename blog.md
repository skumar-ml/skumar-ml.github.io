---
layout: page
title: Blog
permalink: /blog/
---

{% assign listed_posts = site.posts | where_exp: "item", "item.listed != false" %}

<div class="blog-posts">
  {% if listed_posts.size > 0 %}
  {% for post in listed_posts %}
  <div class="post">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>

    <div class="post-excerpt">
      {{ post.excerpt }}
    </div>

    <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
  </div>
  {% endfor %}
  {% else %}
  <p class="blog-under-construction">Under Construction</p>
  {% endif %}
</div> 