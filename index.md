---
layout: home
title: Shubham Kumar | Personal Website
description: Shubham Kumar is a third-year PhD student in AI at Univeristy of Illinois Urbana-Champaign (UIUC).
---

<div class="profile-container">
  <div class="profile-bio">
    <p>Welcome to my website! I am a fourth-year PhD student at the University of Illinois at Urbana-Champaign (UIUC), advised by Prof. <a href="https://vision.ai.illinois.edu/narendra-ahuja/" target="_blank" rel="noopener noreferrer">Narendra Ahuja</a>. I am funded by the NSF Graduate Research Fellowship and multiple UIUC fellowships.</p>
    <p>My research interest centers on decision-making and planning for autonomous systems, focusing on dynamic, partially-observable environments. I just spent a summer at IBM, under the mentorship of <a href="https://saurabhjha.one/" target="_blank" rel="noopener noreferrer">Saurabh Jha</a>, where I worked on world models for model-based control. Previously, I worked in AI interpertability & safety.</p>
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