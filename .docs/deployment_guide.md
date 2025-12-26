# 🚀 How to Deploy CaptionKiln to Vercel

Since your project is configured with Next.js and Supabase, and is already a Git repository, deployment is very straightforward.

## Step 1: Push Your Code
You must push the latest changes (including the Legal/SEO pages we just added) to GitHub.
Run this in your terminal:
```bash
git push origin main
```
*(If you are on a different branch, use `git push origin master` or your specific branch name)*

## Step 2: Open Vercel Dashboard
1.  Go to [vercel.com/new](https://vercel.com/new).
2.  Select your **GitHub** account.
3.  Find `captionkiln` in the list of repositories and click **Import**.

## Step 3: Configure Project
Vercel will detect that it is a Next.js project.
*   **Build Command**: Leave default (`next build`).
*   **Output Directory**: Leave default.
*   **Install Command**: Leave default.

## Step 4: Environment Variables (Crucial!)
Open your `.env.local` file on your computer. You need to copy those values into Vercel's "Environment Variables" section.

Add the following rows in Vercel:
1.  **Key**: `NEXT_PUBLIC_SUPABASE_URL`
    *   **Value**: *(Paste your URL from .env.local)*
2.  **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   **Value**: *(Paste your Key from .env.local)*

## Step 5: Deploy
Click **Deploy**.
Vercel will build your project. It usually takes 1-2 minutes.

## Step 6: Verify Supabase Auth Redirects
Once deployed, Vercel gives you a URL (e.g., `https://captionkiln.vercel.app`).
1.  Go to your **Supabase Dashboard** -> **Authentication** -> **URL Configuration**.
2.  Add your new Vercel URL to the **Site URL** or **Redirect URLs**.
    *   *Why?* If you don't do this, logging in via Google/Email Magic Link will fail because Supabase won't recognize the Vercel domain.

## 🎉 Done!
Your site is now live on the global edge network.
