# Robiconic Digital – Website

Dhaka-based digital marketing agency website offering SEO, SEM, Social Media Marketing, and Google Ads campaigns.

## Adding This Website to GitHub & Hosting with GitHub Pages

### Option A: Single-File HTML (Fastest for GitHub Pages)
If you want to host the original single-file HTML version directly on GitHub Pages without any build step:
1. Create a new public repository on [GitHub](https://github.com/new) (for example, `robiconic-digital`).
2. Rename `Robiconic_Digital___Website_2e839a2d.html` to `index.html`.
3. Upload `index.html` using **Add file → Upload files** on GitHub and click **Commit changes**.
4. Open **Settings → Pages** in your repository, set **Source** to **Deploy from a branch**, select `main` / `/ (root)`, and click **Save**.

### Option B: Full React + Vite Project (Using Git CLI)
```bash
git init
git add .
git commit -m "Initial commit: Robiconic Digital website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Local Development
```bash
npm install
npm run dev
```
