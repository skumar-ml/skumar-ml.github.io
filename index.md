---
layout: home
title: Shubham Kumar | Personal Website
description: Shubham Kumar is a third-year PhD student in AI at Univeristy of Illinois Urbana-Champaign (UIUC).
---

<div class="profile-container">
  <div class="profile-bio">
    <p>Welcome to my website! I am a fourth-year PhD student in the Computer Vision and Robotics Laboratory at the University of Illinois at Urbana-Champaign, advised by Prof. <a href="https://vision.ai.illinois.edu/narendra-ahuja/" target="_blank" rel="noopener noreferrer">Narendra Ahuja</a>.</p>
    <p>I want to understand how and why AI models (for any modality) fail. I believe the key to getting there is by making sense of a model's intermediate representations. I just spent a summer at IBM, under the mentorship of <a href="https://saurabhjha.one/" target="_blank" rel="noopener noreferrer">Saurabh Jha</a>, where I worked on world models for decision-making and planning.</p>
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
    <img src="assets/images/Shubham_Pic.jpg" alt="Shubham Kumar" class="profile-pic">
  </div>
</div>

<div class="clearfix"></div>

<div class="research-section-header">
  <h2>Recent News</h2>
</div>

{% include recent-news.html %}

<div class="research-section-header">
  <h2>Research Highlights</h2>
  <span class="research-section-note">Selected</span>
</div>

{% include research-projects.html limit=2 %}

<p class="research-view-all"><a href="{{ '/research/' | relative_url }}">View all research &rarr;</a></p>