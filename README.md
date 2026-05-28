# Academic Personal Website

This is a personal academic website built with Jekyll. It's designed for PhD students and academics to showcase their research, publications, teaching, and other professional activities.

## Features

- Clean, professional design
- Responsive layout
- Sections for:
  - Projects/Research
  - Teaching
  - Blog/News

## Setup Instructions

### Prerequisites

- Ruby version 2.5.0 or higher
- RubyGems
- GCC and Make

### Installation

1. Install Jekyll and Bundler:
   ```
   gem install jekyll bundler
   ```

2. Clone this repository or download the files

3. Navigate to the website directory:
   ```
   cd path/to/website
   ```

4. Install dependencies:
   ```
   bundle install
   ```

5. Build the site and make it available on a local server:
   ```
   bundle exec jekyll serve
   ```

6. Now browse to http://localhost:4000

## Customization

1. Edit `_config.yml` to update site-wide settings
2. Modify the content in the markdown files in the root directory for main pages
3. Add your publications to the `_publications` directory
4. Add your projects to the `_projects` directory
5. Add your teaching experience to the `_teaching` directory
6. Write blog posts in the `_posts` directory

## Deployment

This site can be deployed to:
- GitHub Pages
- Netlify
- Any static site hosting service

## License

This project is open source and available under the [MIT License](LICENSE). 