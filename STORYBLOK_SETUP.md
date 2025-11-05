# Storyblok Blog Setup Guide

## What's Been Created

I've successfully created a new Storyblok-powered blog page for your ASJR website with the following features:

### 📁 New Files Created:

1. **`src/storyblok/BlogPost.astro`** - Individual blog post component
2. **`src/storyblok/BlogListing.astro`** - Blog listing page component
3. **`src/storyblok/index.js`** - Component registry for Storyblok
4. **`src/pages/storyblok-blog.astro`** - Main blog listing page with dummy data
5. **`src/pages/blog/[slug].astro`** - Dynamic route for individual blog posts
6. **`.env.example`** - Environment variables template

### 🔗 New Routes Available:

- **`/storyblok-blog`** - Main blog listing page (added to navigation as "Stories")
- **`/blog/[slug]`** - Individual blog post pages (e.g., `/blog/bail-reform-initiative-results`)

### 🎨 Features Included:

- **Responsive design** using Momentum Design Components
- **Dummy blog data** with 6 sample posts covering various topics
- **Category filtering** and metadata display
- **Pagination support** (UI ready)
- **Newsletter signup section**
- **Social sharing buttons** on individual posts
- **SEO-friendly** meta tags and descriptions

## 🚀 Current Status

The blog is **working with dummy data** and can be viewed at:
`http://localhost:4321/asjr-web/storyblok-blog`

## 🔧 Next Steps to Connect Real Storyblok Data

### 1. Set up Storyblok Space
1. Create a free account at [Storyblok](https://app.storyblok.com)
2. Create a new space for your project
3. Get your access token from the settings

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and add your Storyblok token:
```bash
cp .env.example .env
# Edit .env and add your token:
STORYBLOK_TOKEN=your-actual-token-here
```

### 3. Re-enable Storyblok Integration
Uncomment the Storyblok integration in `astro.config.mjs`:
```javascript
// Uncomment these lines in astro.config.mjs:
import storyblok from '@storyblok/astro';

// In integrations array:
storyblok({
  accessToken: import.meta.env.STORYBLOK_TOKEN,
  components: {
    blog_post: 'storyblok/BlogPost',
    blog_listing: 'storyblok/BlogListing',
  },
})
```

### 4. Create Content Types in Storyblok
Create these content types (bloks) in your Storyblok space:

**Blog Post** (`blog_post`):
- `title` (Text)
- `excerpt` (Textarea) 
- `content` (Rich Text)
- `category` (Text)
- `slug` (Text)
- `published_date` (Date)
- `featured_image` (Asset)

**Blog Listing** (`blog_listing`):
- `title` (Text)
- `description` (Textarea)
- `posts` (Multi-asset reference to blog_post)
- `show_newsletter` (Boolean)
- `show_pagination` (Boolean)

### 5. Update Components to Use Real Data
Uncomment the Storyblok API calls in:
- `src/pages/storyblok-blog.astro`
- `src/pages/blog/[slug].astro`
- `src/storyblok/BlogPost.astro`
- `src/storyblok/BlogListing.astro`

## 🎯 Current Dummy Data

The page currently shows 6 sample blog posts with categories:
- Policy Reform
- Community Action  
- Education
- Advocacy
- Youth Programs
- Research

Each post includes a placeholder image, publication date, and excerpt.

## 🔍 Testing

You can test the functionality by:
1. Visiting `/storyblok-blog` to see the main listing
2. Clicking "Read More" on any post to go to the individual post page
3. Using the navigation to switch between the original `/blog` and new `/storyblok-blog`

The new "Stories" link has been added to your main navigation in the header.

## 📝 Notes

- The setup is currently working without the full Storyblok integration to avoid import errors
- All components are ready for Storyblok integration
- The styling matches your existing design system using Momentum components
- Individual blog posts have unique URLs and can be linked/shared directly