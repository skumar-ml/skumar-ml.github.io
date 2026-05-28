---
# Copy this file to a new name (e.g. my-project.md) to create a project page.
# Files prefixed with _ are not published by Jekyll.
layout: project
title: "Paper Title"
description: "One-sentence summary for SEO and the research listing page."
authors:
  - name: "Your Name"
    url: "https://your-website.com"
  - name: "Co-author Name"
    url: "https://coauthor-website.com"
affiliation: "Your University"
venue: "Conference / Journal, Year"
published_date: 2024-01-01
keywords:
  - keyword one
  - keyword two
links:
  - name: "Paper"
    type: paper
    url: "https://arxiv.org/pdf/PAPER_ID.pdf"
  - name: "Code"
    type: code
    url: "https://github.com/yourusername/repo"
  - name: "arXiv"
    type: arxiv
    url: "https://arxiv.org/abs/PAPER_ID"

# Optional sections — remove any you don't need
teaser:
  video: "/assets/academic-project/videos/banner_video.mp4"
  # image: "/assets/images/teaser.jpg"
  caption: "Short teaser caption."

abstract: |
  Your paper abstract goes here.

image_carousel_title: "Results"
image_carousel:
  - image: "/assets/images/result1.jpg"
    caption: "Caption for result 1."

youtube:
  title: "Video Presentation"
  id: "YOUTUBE_VIDEO_ID"

video_carousel:
  title: "Video Results"
  items:
    - video: "/assets/videos/demo1.mp4"
      caption: "Optional caption."

poster:
  pdf: "/assets/pdfs/poster.pdf"

bibtex: |
  @inproceedings{yourkey2024,
    title={Your Paper Title},
    author={Your Name and Co-author Name},
    booktitle={Conference Name},
    year={2024}
  }

# Optional: override auto-generated "More Works" dropdown
# more_works_title: "More Works from Our Lab"
# more_works:
#   - title: "Related Paper"
#     link: "https://arxiv.org/abs/..."
#     description: "Brief description."
#     venue: "Venue 2023"
---

## Additional Content

Optional markdown sections rendered below the abstract.

<!-- Math: use $...$ / $$...$$ for simple expressions. For complex inline math
     (subscript ranges, nested _{}), use {% include inline-math.html latex="..." %} -->
