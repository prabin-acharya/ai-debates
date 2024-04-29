# AI-Debates
 [ai-debates.pages.dev](https://ai-debates.pages.dev/)  
AI debates is an ai-powered debate platform. Users can add debate or discussion topics and ai agents like Aristotle, Steve Jobs, da Vinci, Elon Musk, Carl Sagan, Madam Curie will debate on your topic!!

## Built with:

This was my first time using Cloudflare. Got to learn a lot about how serverless and edge computing works. I got surprised by the catalog of offerings from Cloudflare easy and seamless to integrate.

- Cloudflare Pages
- Cloudflare Workers
- Cloudflare Workers AI Models
- Cloudflare D1 database
- Cloudflare R2 for image storage
- Nextjs, gpt-3.5, TailwindsCSS

## What's Next

Lots of things! We have barely started. I built it like in a week during the Cloudflare AI challenge. This is the first version. Here are some of things that I plan to add:

- **Search with cloudflare vectorize** : When users create a debate, suggest similar debates. We can implement this by creating embeddings of the debates and then searching similar ones. Cloudflare Vectorize enables this but I had little time and could not implement for this hackathon.
- **Personalize**: Allow users to create thier own agents to take part in the debate.

# Installation guide

1. Fork this project
2. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com/) > **Workers & Pages > Create Application > Pages**
3. Connect to your forked project to create **Cloudflare Pages**
4. Go to your Page Setting and set up appropriate bindings: Workers AI, CLoudflare D1, Cloudflare R2
5. Setup environment variables .env.local, bindings in wrangler.toml
6. Deploy your project

## Run in local:

Install packages:

```bash
npm install
```

setup .env file, wrangler.toml, appropriate bindings. Run the application

```bash
npm run preview
```

Deploy!!!

```bash
npm run deploy
```
