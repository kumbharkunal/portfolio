# 🚀 CodePro Complete Deployment Guide
## From Zero to Live in 2 Hours!

**Your SaaS Application:** CodePro - AI-Powered GitHub PR Reviewer  
**Your Domain:** codeproapp.online  
**Your VPS:** Hostinger KVM2 (2 vCPU, 8GB RAM, 100GB NVMe, 8TB Bandwidth)  
**Tech Stack:** Docker + Nginx + Cloudflare + GitHub Actions
**Cost:** ~$100-130/month (VPS + MongoDB + optional services)

---

## 🎯 Progress Tracker

Track your progress as you go:

### Phase 1: Accounts & API Keys (30-45 min)
- [ ] VPS access confirmed
- [ ] MongoDB Atlas setup ✅
- [ ] Clerk authentication ✅
- [ ] GitHub OAuth app ✅
- [ ] Google Gemini AI ✅
- [ ] Stripe payments ✅
- [ ] Cloudinary images ✅
- [ ] Resend emails ✅

### Phase 2: VPS Initial Setup (15 min)
- [ ] Connected to VPS via SSH
- [ ] System updated
- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Nginx installed
- [ ] Firewall configured

### Phase 3: Cloudflare Setup (20 min)
- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] DNS configured
- [ ] Nameservers changed at Namecheap
- [ ] SSL enabled (automatic!)
- [ ] CDN and security enabled

### Phase 4: Project Setup (10 min)
- [ ] Repository cloned to VPS
- [ ] Environment file created
- [ ] All API keys configured

### Phase 5: Nginx Configuration (10 min)
- [ ] Nginx config created
- [ ] Site enabled
- [ ] Configuration tested

### Phase 6A: Automated Deployment (Recommended) ⭐
- [ ] Added all 21 secrets to GitHub
- [ ] Generated and configured SSH keys
- [ ] Tested automated deployment
- [ ] Verified app deploys on git push

### Phase 6B: Manual GitHub Actions (Alternative)
- [ ] SSH keys generated
- [ ] GitHub secrets configured

### Phase 7: First Deployment (10 min)
- [ ] Docker containers built
- [ ] Application running
- [ ] Health check passed

### Phase 8: Final Testing (15 min)
- [ ] Website loads with HTTPS
- [ ] Authentication works
- [ ] All features tested
- [ ] Webhooks configured

---

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: External Services Setup](#phase-1-external-services-setup)
3. [Phase 2: VPS Initial Setup](#phase-2-vps-initial-setup)
4. [Phase 3: Cloudflare Complete Setup](#phase-3-cloudflare-complete-setup)
5. [Phase 4: Project Configuration](#phase-4-project-configuration)
6. [Phase 5: Nginx Setup](#phase-5-nginx-setup)
7. **[Phase 6A: Automated Deployment (Recommended)](#phase-6-automated-deployment)** ⭐
8. [Phase 6B: Manual GitHub Actions (Alternative)](#phase-6-github-actions)
9. [Phase 7: First Deployment](#phase-7-first-deployment)
10. [Phase 8: Testing & Verification](#phase-8-testing--verification)
11. [Phase 9: Webhook Configuration](#phase-9-webhook-configuration)
12. [Maintenance & Troubleshooting](#maintenance--troubleshooting)

---

<a name="prerequisites"></a>
## 🎒 Prerequisites

### What You Need Before Starting:

1. **Hostinger VPS** - KVM2 plan active
2. **Domain** - codeproapp.online (purchased from Namecheap)
3. **Email** - For creating accounts
4. **Credit Card** - For paid services (MongoDB, Stripe verification)
5. **Computer** - Windows/Mac/Linux with internet
6. **SSH Client** - 
   - Windows: Built-in PowerShell or Command Prompt
   - Mac/Linux: Built-in Terminal

### What's Included Free:
- ✅ Cloudflare (SSL, CDN, Security)
- ✅ Cloudinary (Free tier: 25GB)
- ✅ Resend (Free tier: 3k emails/month)
- ✅ GitHub Actions (Free for public repos)

### What Costs Money:
- 💰 Hostinger VPS: ₹499/month (~$6/month)
- 💰 MongoDB Atlas: $57/month (M10 cluster)
- 💰 Clerk: $25/month (Pro plan, 10k users)
- 💰 Gemini AI: Pay-per-use (varies with usage)
- 💰 Stripe: 2.9% + $0.30 per transaction

---

<a name="phase-1-external-services-setup"></a>
## 🔑 Phase 1: External Services Setup
### ⏱️ Time: 30-45 minutes

> **💡 Tip:** Open each service in a new browser tab and keep notes of all API keys!

---

### 1️⃣ MongoDB Atlas (Database)

**What it does:** Stores all your application data (users, reviews, repositories)

#### Step 1.1: Create Account
1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Click "Try Free"**
3. **Sign up with:**
   - Google account (easiest), OR
   - Email + password
4. **Verify email** (check inbox)

#### Step 1.2: Create Cluster
1. **Welcome screen → Click "Build a Database"**
2. **Choose deployment:**
   - For Production: **M10** (Dedicated, $57/month) ← Recommended
   - For Testing Only: **M0** (Free, limited)
3. **Cloud Provider:** AWS
4. **Region:** Choose closest to your VPS location
   - If VPS in India: Mumbai
   - If VPS in Europe: Frankfurt
   - If VPS in USA: N. Virginia
5. **Cluster Name:** `CodePro-Cluster` (or keep default)
6. **Click "Create"** (takes 3-5 minutes to provision)

#### Step 1.3: Create Database User
1. **Security screen appears**
2. **Authentication Method:** Username and Password
3. **Username:** `codepro_admin`
4. **Password:** Click "Autogenerate Secure Password"
   - **COPY THIS PASSWORD!** Save it in Notepad
5. **User Privileges:** Atlas Admin
6. **Click "Create User"**

#### Step 1.4: Setup Network Access
1. **Click "Network Access"** in left sidebar
2. **Click "Add IP Address"**
3. **Choose one:**
   - **Option A (Easiest):** Click "Allow Access from Anywhere"
     - Adds `0.0.0.0/0`
     - ⚠️ Less secure but easier
   - **Option B (More Secure):** Add your VPS IP
     - Enter your VPS IP address
     - Click "Confirm"
4. **Click "Finish and Close"**

#### Step 1.5: Get Connection String
1. **Click "Database"** in left sidebar
2. **Click "Connect"** button on your cluster
3. **Choose "Connect your application"**
4. **Driver:** Node.js
5. **Version:** 5.5 or later
6. **Copy the connection string** - looks like:
   ```
   mongodb+srv://codepro_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **Edit the string:**
   - Replace `<password>` with your actual password from Step 1.3
   - Add database name: change `/?retryWrites` to `/codepro?retryWrites`
   
   **Final format:**
   ```
   mongodb+srv://codepro_admin:YourActualPassword123@cluster0.xxxxx.mongodb.net/codepro?retryWrites=true&w=majority
   ```

✅ **Save this connection string!** You'll need it later.

---

### 2️⃣ Clerk (Authentication Service)

**What it does:** Handles user sign-up, login, and authentication

#### Step 2.1: Create Account
1. **Go to:** https://clerk.com
2. **Click "Start Building"** or "Sign Up"
3. **Sign up with GitHub** (easiest) or email
4. **Verify email** if needed

#### Step 2.2: Create Application
1. **Dashboard loads → Click "Create Application"**
2. **Application name:** `CodePro`
3. **Choose sign-in methods:** (select all 3)
   - ✅ Email
   - ✅ Google
   - ✅ GitHub
4. **Click "Create Application"**

#### Step 2.3: Get API Keys
1. **Sidebar → Click "API Keys"**
2. **You'll see:**
   - **Publishable Key** (starts with `pk_test_...` or `pk_live_...`)
   - Click "Show" on **Secret Key** (starts with `sk_test_...` or `sk_live_...`)
3. **Copy both keys** - save in Notepad:
   ```
   CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
   ```

#### Step 2.4: Add Production Domain
1. **Sidebar → Click "Domains"**
2. **Click "Add domain"**
3. **Enter:** `codeproapp.online`
4. **Click "Add domain"**

#### Step 2.5: Setup Webhook
1. **Sidebar → Click "Webhooks"**
2. **Click "Add Endpoint"**
3. **Endpoint URL:** `https://codeproapp.online/api/clerk/webhook`
4. **Subscribe to events:**
   - ✅ user.created
   - ✅ user.updated
   - ✅ user.deleted
5. **Click "Create"**
6. **Copy the Signing Secret** (starts with `whsec_...`)
   ```
   CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

✅ **Saved: 3 keys from Clerk!**

---

### 3️⃣ GitHub OAuth App

**What it does:** Allows users to connect their GitHub repositories

#### Step 3.1: Create OAuth App
1. **Go to:** https://github.com/settings/developers
2. **Click "OAuth Apps"** tab
3. **Click "New OAuth App"**
4. **Fill in:**
   - **Application name:** `CodePro`
   - **Homepage URL:** `https://codeproapp.online`
   - **Authorization callback URL:** `https://codeproapp.online/oauth/callback`
   - **Application description:** (optional) `AI-powered GitHub PR reviewer`
5. **Click "Register application"**

#### Step 3.2: Get Client ID and Secret
1. **Copy "Client ID"** - save it:
   ```
   GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxxx
   ```
2. **Click "Generate a new client secret"**
3. **Copy the secret** (you can only see this once!):
   ```
   GITHUB_CLIENT_SECRET=xxxxxxxxxxxxx
   ```

#### Step 3.3: Generate Webhook Secret
1. **Open Command Prompt/Terminal** on your computer
2. **Run this command:**
   ```bash
   openssl rand -hex 32
   ```
   If `openssl` not found, use this website: https://www.random.org/strings/
   - Length: 32
   - Characters: Hex
   - Click "Get Strings"
3. **Copy the output:**
   ```
   GITHUB_WEBHOOK_SECRET=your_generated_hex_string
   ```

✅ **Saved: 3 keys from GitHub!**

---

### 4️⃣ Google Gemini AI

**What it does:** Powers the AI code review functionality

#### Step 4.1: Get API Key
1. **Go to:** https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click "Create API Key"** button
4. **Choose project:** Create new project or use existing
5. **Click "Create API key in new project"**
6. **Copy the API key** (starts with `AIzaSy...`):
   ```
   GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxx
   ```

✅ **Saved: 1 key from Gemini!**

---

### 5️⃣ Stripe (Payment Processing)

**What it does:** Handles subscription payments (Pro & Enterprise plans)

#### Step 5.1: Create Account
1. **Go to:** https://dashboard.stripe.com/register
2. **Fill in:**
   - Email
   - Full name
   - Country
   - Password
3. **Click "Create account"**
4. **Verify email**

#### Step 5.2: Activate Account
1. **Complete business profile** (required for live mode)
   - Business type: Individual or Company
   - Business details
   - Bank account info (for receiving payments)
2. **Wait for approval** (usually instant to 24 hours)

#### Step 5.3: Switch to Live Mode
1. **Toggle in top right:** Switch from "Test mode" to "Live mode"
   - Or stay in Test mode for now and switch later

#### Step 5.4: Create Products
**Product 1: Pro Plan**
1. **Click "Products"** in sidebar
2. **Click "+ Add product"**
3. **Fill in:**
   - **Name:** `CodePro Pro`
   - **Description:** `Pro subscription with 5 repos and 300 reviews/month`
4. **Pricing:**
   - **Price:** `25` USD
   - **Billing period:** Recurring - Monthly
5. **Click "Add product"**
6. **Copy the Price ID** (starts with `price_...`):
   ```
   STRIPE_PRICE_ID_PRO=price_xxxxxxxxxxxxx
   ```

**Product 2: Enterprise Plan**
1. **Click "+ Add product"** again
2. **Fill in:**
   - **Name:** `CodePro Enterprise`
   - **Description:** `Enterprise subscription with unlimited repos and reviews`
3. **Pricing:**
   - **Price:** `99` USD
   - **Billing period:** Recurring - Monthly
4. **Click "Add product"**
5. **Copy the Price ID:**
   ```
   STRIPE_PRICE_ID_ENTERPRISE=price_xxxxxxxxxxxxx
   ```

#### Step 5.5: Get API Keys
1. **Click "Developers"** in sidebar
2. **Click "API keys"**
3. **Copy:**
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key**: Click "Reveal test/live key" (starts with `sk_live_...`)
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
   ```

#### Step 5.6: Setup Webhook
1. **Click "Webhooks"** (under Developers)
2. **Click "+ Add endpoint"**
3. **Endpoint URL:** `https://codeproapp.online/api/stripe/webhook`
4. **Events to send:** Click "Select events"
   - Search for and select ALL events under "customer" and "subscription"
   - Or click "Select all customer events" and "Select all subscription events"
5. **Click "Add endpoint"**
6. **Click "Reveal" on Signing secret:**
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

✅ **Saved: 4 keys from Stripe!**

---

### 6️⃣ Cloudinary (Image Storage)

**What it does:** Stores user profile pictures

#### Step 6.1: Create Account
1. **Go to:** https://cloudinary.com/users/register_free
2. **Fill in:**
   - Email
   - Password
3. **Click "Sign Up"**
4. **Verify email**

#### Step 6.2: Get API Credentials
1. **Dashboard loads** (you'll see your Dashboard after login)
2. **Look for "Account Details" section**
3. **Copy these 3 values:**
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=your_api_secret
   ```

✅ **Saved: 3 values from Cloudinary!**

---

### 7️⃣ Resend (Email Service)

**What it does:** Sends invitation emails to team members

#### Step 7.1: Create Account
1. **Go to:** https://resend.com/signup
2. **Sign up with:**
   - Email + password, OR
   - GitHub (easiest)
3. **Verify email**

#### Step 7.2: Create API Key
1. **Dashboard → Click "API Keys"** in sidebar
2. **Click "Create API Key"**
3. **Name:** `CodePro Production`
4. **Permission:** Full Access
5. **Click "Create"**
6. **Copy the API key** (starts with `re_...`):
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

#### Step 7.3: Configure Email From
You'll use:
```
EMAIL_FROM=CodePro <noreply@codeproapp.online>
```

> **Note:** For production, you should verify your domain in Resend, but for now the default works.

✅ **Saved: 1 key from Resend!**

---

### ✅ Phase 1 Complete!

**You should now have these saved:**
```
MONGODB_URI=mongodb+srv://...
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
GITHUB_CLIENT_ID=Iv1....
GITHUB_CLIENT_SECRET=...
GITHUB_WEBHOOK_SECRET=...
GEMINI_API_KEY=AIzaSy...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
EMAIL_FROM=CodePro <noreply@codeproapp.online>
```

**Keep these safe! We'll use them soon.**

---

<a name="phase-2-vps-initial-setup"></a>
## 🖥️ Phase 2: VPS Initial Setup
### ⏱️ Time: 15 minutes

> **What we're doing:** Installing Docker, Nginx, and securing your VPS

---

### Step 2.1: Get VPS Credentials

1. **Login to Hostinger** (https://hpanel.hostinger.com)
2. **Click "VPS"** in top menu
3. **Click your KVM2 VPS**
4. **Note down:**
   - **IP Address:** (e.g., `203.0.113.45`)
   - **SSH Access:**
     - **Username:** `root`
     - **Password:** Click "Show" to reveal
5. **Save these:**
   ```
   VPS_IP=your.vps.ip.address
   VPS_USERNAME=root
   VPS_PASSWORD=your_password
   ```

---

### Step 2.2: Connect to VPS via SSH

**On Windows:**
1. **Open Command Prompt** or **PowerShell**
   - Press `Win + R`
   - Type `cmd` or `powershell`
   - Press Enter

**On Mac/Linux:**
1. **Open Terminal**
   - Press `Cmd + Space`
   - Type "terminal"
   - Press Enter

**Connect:**
```bash
ssh root@your.vps.ip.address
```
Replace `your.vps.ip.address` with your actual IP (e.g., `ssh root@203.0.113.45`)

**When prompted:**
1. Type `yes` and press Enter (if asked about fingerprint)
2. **Enter password** (paste with right-click, won't show while typing)
3. Press Enter

✅ **You're in!** You should see something like: `root@vps12345:~#`

---

### Step 2.3: Update System

**Copy and paste this command:**
```bash
apt update && apt upgrade -y
```

⏱️ *Takes 2-5 minutes. Wait for it to complete.*

You'll see lots of text scrolling. Wait until you see the prompt again (`root@...#`).

---

### Step 2.4: Install Docker

**Copy and paste:**
```bash
curl -fsSL https://get.docker.com | sh
```

⏱️ *Takes 1-2 minutes*

**Verify installation:**
```bash
docker --version
```

✅ You should see: `Docker version 27.0.0` or newer (2025 latest)

---

### Step 2.5: Install Docker Compose V2

**Docker Compose V2 is now built into Docker!**

Check if it's already installed:
```bash
docker compose version
```

✅ You should see: `Docker Compose version v2.24.0` or newer

**If not found, install it:**
```bash
# Download latest Docker Compose V2
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose

# Verify again
docker compose version
```

> **Note:** Modern Docker uses `docker compose` (with space), not `docker-compose` (with hyphen)

---

### Step 2.6: Install Nginx

**Copy and paste:**
```bash
apt install nginx -y
```

**Start and enable Nginx:**
```bash
systemctl start nginx
systemctl enable nginx
```

**Verify it's running:**
```bash
systemctl status nginx
```

✅ You should see: `active (running)` in green

To check Nginx version:
```bash
nginx -v
```

✅ You should see: `nginx version: nginx/1.24.0` or newer (2025 stable)

**Press `q` to exit the status view**

**Test in browser:**
1. Open your browser
2. Go to: `http://your.vps.ip.address`
3. You should see "Welcome to nginx!" page

---

### Step 2.7: Install Git (if not installed)

**Copy and paste:**
```bash
apt install git -y
```

---

### Step 2.8: Configure Firewall

**Allow SSH (important - don't lock yourself out!):**
```bash
ufw allow 22/tcp
```

**Allow HTTP and HTTPS:**
```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

**Enable firewall:**
```bash
ufw --force enable
```

**Check status:**
```bash
ufw status
```

✅ You should see:
```
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

---

### ✅ Phase 2 Complete!

Your VPS now has:
- ✅ Docker & Docker Compose
- ✅ Nginx web server
- ✅ Git version control
- ✅ Firewall configured

**Check:** Can you still access `http://your.vps.ip` and see Nginx page? ✅

---

<a name="phase-3-cloudflare-complete-setup"></a>
## ☁️ Phase 3: Cloudflare Complete Setup
### ⏱️ Time: 20 minutes

> **What we're doing:** Setting up free SSL, CDN, DDoS protection, and security

---

### Step 3.1: Create Cloudflare Account

1. **Go to:** https://dash.cloudflare.com/sign-up
2. **Enter your email and create password**
3. **Click "Create Account"**
4. **Verify email** (check inbox, click link)

---

### Step 3.2: Add Your Domain

1. **Click "Add a Site"** (blue button)
2. **Enter:** `codeproapp.online`
3. **Click "Add site"**

---

### Step 3.3: Select Plan

1. **Choose "Free"** (₹0 / month)
2. **Scroll down, click "Continue"**

⏱️ *Cloudflare scans your DNS records (takes 30 seconds)*

---

### Step 3.4: Configure DNS Records

**Cloudflare shows existing DNS records from Namecheap.**

**Delete all existing records:**
1. Click **X** or **Delete** on each record

**Add new records:**
1. **Click "Add record"**
2. **Record 1:**
   - **Type:** A
   - **Name:** `@`
   - **IPv4 address:** Your VPS IP (e.g., `203.0.113.45`)
   - **Proxy status:** ☁️ **Proxied** (orange cloud) ← IMPORTANT!
   - **TTL:** Auto
   - Click "Save"

3. **Click "Add record"** again
4. **Record 2:**
   - **Type:** A
   - **Name:** `www`
   - **IPv4 address:** Your VPS IP (same as above)
   - **Proxy status:** ☁️ **Proxied** (orange cloud) ← IMPORTANT!
   - **TTL:** Auto
   - Click "Save"

**Make sure both records show orange cloud (Proxied)!**

5. **Click "Continue"**

---

### Step 3.5: Change Nameservers at Namecheap

**Cloudflare shows you 2 nameservers like:**
```
dana.ns.cloudflare.com
rob.ns.cloudflare.com
```

**Copy these nameservers!**

**Now go to Namecheap:**
1. **Open new tab:** https://namecheap.com
2. **Sign in** to your account
3. **Click "Domain List"** in sidebar
4. **Find codeproapp.online** → Click **"Manage"**
5. **Scroll to "Nameservers" section**
6. **Change from "Namecheap BasicDNS"** to **"Custom DNS"**
7. **Enter Cloudflare's nameservers:**
   - **Nameserver 1:** `dana.ns.cloudflare.com` (or whatever Cloudflare showed you)
   - **Nameserver 2:** `rob.ns.cloudflare.com` (or whatever Cloudflare showed you)
8. **Click green checkmark** to save

**Back in Cloudflare tab:**
9. **Click "Done, check nameservers"**

⏱️ **Wait 5-30 minutes** for nameservers to update. Cloudflare will email you when done.

> **💡 Tip:** While waiting, continue to next steps. Come back later to verify.

---

### Step 3.6: Configure SSL/TLS

**Don't wait for nameservers! Do this now:**

1. **In Cloudflare dashboard, click "SSL/TLS"** in sidebar
2. **Overview tab:**
   - **Select "Flexible"** (easiest option)
   - This means: User → Cloudflare = HTTPS, Cloudflare → Your VPS = HTTP

3. **Click "Edge Certificates"** tab
4. **Enable these:**
   - ✅ **Always Use HTTPS** (toggle to ON)
   - ✅ **Automatic HTTPS Rewrites** (toggle to ON)
   - ✅ **Disable Universal SSL** should be OFF (keep it enabled)

---

### Step 3.7: Speed Optimization (Updated for 2025 UI)

**Click "Speed"** in left sidebar → **Click "Settings"**

You'll see 4 tabs at the top:
- Recommendations
- Image Optimization
- Content Optimization
- Protocol Optimization

#### Quick Setup (Easiest):
**On the "Recommendations" tab:**
1. **Click "Enable all available settings"** button (blue button on right)
2. This enables all free speed optimizations automatically ✅
3. **Done!**

#### Or Configure Manually:

**1. Content Optimization tab:**
- **Auto Minify:**
  - Scroll down to "Auto Minify" section
  - ✅ Enable JavaScript
  - ✅ Enable CSS
  - ✅ Enable HTML
- **Brotli:** Should be enabled automatically (check "Compression" section)
- **Rocket Loader:** 
  - Find "Rocket Loader" toggle
  - ❌ Keep it **OFF** (can break React apps)

**2. Image Optimization tab:**
- **Polish:** Select "Lossless" (free)
- **Mirage:** Enable if available (may require paid plan)
- **WebP:** Enable automatic WebP conversion

**3. Protocol Optimization tab:**
- **HTTP/2:** Should be ON by default
- **HTTP/3 (with QUIC):** Enable if available
- **0-RTT Connection Resumption:** Enable

> **💡 Tip:** For the free plan, just click "Enable all available settings" on the Recommendations tab - it's the easiest!

---

### Step 3.8: Caching Configuration (Updated for 2025 UI)

**Click "Caching"** in left sidebar → **Click "Configuration"**

**1. Configuration tab:**
   - **Caching Level:** Standard
   - **Browser Cache TTL:** 4 hours
   - **Save**

**2. Create Cache Rules** (replaces old Page Rules):

**Click "Cache Rules"** in Caching sidebar (if available on free plan)

**OR use Page Rules** (older method, still works):

**Go to "Rules"** in main sidebar → **Page Rules** → **Create Rule**

**Rule 1: Cache Static Assets**
- **If the URL matches:** `*codeproapp.online/assets/*`
- **Cache Level:** Cache Everything
- **Edge Cache TTL:** 1 month
- Click "Save and Deploy"

**Rule 2: Bypass API Cache**
- Create new rule
- **If the URL matches:** `*codeproapp.online/api/*`
- **Cache Level:** Bypass
- Click "Save and Deploy"

> **Note:** Free plan gets 3 Page Rules. Use them wisely!

---

### Step 3.9: Security Settings

**Click "Security"** in sidebar

**1. Settings tab:**
   - **Security Level:** Medium
   - **Bot Fight Mode:** ✅ ON
   - **Challenge Passage:** 30 minutes

**2. WAF (Web Application Firewall):**
- **Click "WAF"** in sidebar
- **Managed rules tab:**
  - **Cloudflare Managed Ruleset:** ✅ Enable/Deploy

---

### Step 3.10: Verify Cloudflare is Active

**Check status:**
1. **In Cloudflare dashboard, check the banner at top**
2. **Status should show:**
   - 🟡 **Pending nameserver update** (if just changed)
   - 🟢 **Active** (if nameservers have propagated)

**If still pending:**
- Wait 10-30 minutes more
- Check your email for "Your site is active" from Cloudflare

**Test DNS:**
1. Open website: https://dnschecker.org
2. Enter: `codeproapp.online`
3. Select: **NS** (Nameserver)
4. Click "Search"
5. Should show Cloudflare nameservers (dana.ns.cloudflare.com, rob.ns.cloudflare.com)

**Test domain (once active):**
1. Open browser
2. Go to: `http://codeproapp.online`
3. Should redirect to: `https://codeproapp.online` ✅
4. Click padlock in browser → Should show "Cloudflare" certificate ✅

---
<a name="phase-4-project-configuration"></a>
## 📁 Phase 4: Project Configuration
### ⏱️ Time: 10 minutes

> **What we're doing:** Cloning your code and setting up environment variables

---

### Step 4.1: Clone Repository on VPS

**In your SSH terminal (connected to VPS):**

```bash
# Create directory
mkdir -p /var/www
cd /var/www

# Clone repository
git clone https://github.com/YOUR-GITHUB-USERNAME/codepro.git
```

**Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username!**

**Enter directory:**
```bash
cd codepro
```

**Verify files:**
```bash
ls -la
```

✅ You should see: `BackEnd`, `FrontEnd`, `docker-compose.production.yml`, etc.

---

### Step 4.2: Create Environment File

```bash
nano .env.production
```

**This opens a text editor. Now paste this template:**

```bash
# MongoDB
MONGODB_URI=your_mongodb_connection_string_from_phase_1

# Redis
REDIS_PASSWORD=create_a_strong_password_here

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID_PRO=your_stripe_pro_price_id
STRIPE_PRICE_ID_ENTERPRISE=your_stripe_enterprise_price_id

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Resend
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=CodePro <noreply@codeproapp.online>

# Application URLs (IMPORTANT - use your actual domain!)
FRONTEND_URL=https://codeproapp.online
WEBHOOK_URL=https://codeproapp.online/api/webhooks/github

# Environment
NODE_ENV=production
PORT=5000
```

**Now replace all the values with your actual keys from Phase 1!**

**For Redis password, create a strong one:**
```
REDIS_PASSWORD=Redis_2025_CodePro_Secure_789!
```

**Save the file:**
1. Press `Ctrl + X`
2. Press `Y` (for yes)
3. Press `Enter`

**Secure the file:**
```bash
chmod 600 .env.production
```

**Verify it was created:**
```bash
cat .env.production
```

✅ You should see your variables (keys will be hidden with `chmod 600`)

---

### ✅ Phase 4 Complete!

Your project is now on the VPS with all configurations set!

---

<a name="phase-5-nginx-setup"></a>
## 🌐 Phase 5: Nginx Setup
### ⏱️ Time: 10 minutes

> **What we're doing:** Configuring Nginx to route traffic to your Docker containers

---

### Step 5.1: Create Nginx Configuration

```bash
nano /etc/nginx/sites-available/codeproapp.online
```

**Paste this configuration:**

```nginx
# Nginx Configuration for CodePro with Cloudflare

# Rate limiting zones
limit_req_zone $binary_remote_addr zone=codepro_api:10m rate=100r/m;
limit_req_zone $binary_remote_addr zone=codepro_general:10m rate=500r/m;

# Main HTTP server (Cloudflare handles HTTPS)
server {
    listen 80;
    listen [::]:80;
    server_name codeproapp.online www.codeproapp.online;

    # Get real visitor IP from Cloudflare
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 131.0.72.0/22;
    real_ip_header CF-Connecting-IP;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Max upload size
    client_max_body_size 10M;

    # Logging
    access_log /var/log/nginx/codepro_access.log;
    error_log /var/log/nginx/codepro_error.log warn;

    # Backend API routes
    location /api/ {
        limit_req zone=codepro_api burst=20 nodelay;
        
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        proxy_buffering off;
    }

    # WebSocket for Socket.io
    location /socket.io/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:5001/health;
        access_log off;
    }

    # Frontend - React SPA
    location / {
        limit_req zone=codepro_general burst=50 nodelay;
        
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets - cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:8081;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Deny hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

**Save:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

---

### Step 5.2: Enable Site

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/codeproapp.online /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default
```

---

### Step 5.3: Test Configuration

```bash
nginx -t
```

✅ **You should see:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

### Step 5.4: Reload Nginx

```bash
systemctl reload nginx
```

**Check status:**
```bash
systemctl status nginx
```

✅ Should show: `active (running)` in green

**Press `q` to exit**

---

### ✅ Phase 5 Complete!
**On your VPS terminal:**

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions"
```

**Press Enter 3 times** (accept all defaults, no passphrase)

---

### Step 6.2: Display Private Key

```bash
cat ~/.ssh/id_rsa
```

**Copy the ENTIRE output** (including `-----BEGIN` and `-----END` lines)

Paste it in Notepad temporarily. Label it: **VPS_SSH_KEY**

---

### Step 6.3: Display Public Key

```bash
cat ~/.ssh/id_rsa.pub
```

**Copy this output too**

---

### Step 6.4: Add Public Key to Authorized Keys

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

### Step 6.5: Add Secrets to GitHub

**Open your GitHub repository in browser:**

1. **Go to:** `https://github.com/YOUR-USERNAME/codepro`
2. **Click "Settings"** tab
3. **Click "Secrets and variables"** in left sidebar
4. **Click "Actions"**
5. **Click "New repository secret"**

**Add these 4 secrets:**

**Secret 1:**
- **Name:** `VPS_HOST`
- **Value:** Your VPS IP address (e.g., `203.0.113.45`)
- Click "Add secret"

**Secret 2:**
- **Name:** `VPS_USERNAME`
- **Value:** `root`
- Click "Add secret"

**Secret 3:**
- **Name:** `VPS_SSH_KEY`
- **Value:** The private key you copied in Step 6.2 (entire content)
- Click "Add secret"

**Secret 4:**
- **Name:** `VPS_PORT`
- **Value:** `22`
- Click "Add secret"

✅ **All 4 secrets added!**

---

### ✅ Phase 6 Complete!

GitHub Actions will now auto-deploy when you push to `main` branch!

---

<a name="phase-7-first-deployment"></a>
## 🚀 Phase 7: First Deployment
### ⏱️ Time: 10 minutes

> **What we're doing:** Building and starting your Docker containers

---

### Step 7.1: Build and Start Containers

**On your VPS, in `/var/www/codepro` directory:**

```bash
cd /var/www/codepro
docker compose -f docker-compose.production.yml up --build -d
```

> **Note:** Using `docker compose` (with space) - the modern V2 syntax

⏱️ **This takes 5-10 minutes** (building images, downloading dependencies)

You'll see output like:
```
Building backend...
Building frontend...
Creating codepro-redis...
Creating codepro-backend...
Creating codepro-frontend...
```

---

### Step 7.2: Check Container Status

```bash
docker compose -f docker-compose.production.yml ps
```

✅ **All 3 containers should show "Up":**
```
        Name                       State
codepro-backend           Up
codepro-frontend          Up
codepro-redis             Up
```

---

### Step 7.3: View Logs

```bash
docker compose -f docker-compose.production.yml logs --tail=50
```

**Look for:**
- ✅ Backend: `Server running on port 5000`
- ✅ Frontend: Container started successfully
- ✅ Redis: `Ready to accept connections`

**Press `Ctrl + C` to exit logs**

---

### Step 7.4: Test Health Endpoint

```bash
curl http://localhost:5001/health
```

✅ **Should return:**
```json
{"status":"OK","timestamp":"..."}
```

---

### ✅ Phase 7 Complete!

Your CodePro app is now running in Docker containers!

---

<a name="phase-8-testing--verification"></a>
## ✅ Phase 8: Testing & Verification
### ⏱️ Time: 15 minutes

> **What we're doing:** Making sure everything works perfectly

---

### Step 8.1: Test Website

**In your browser:**

1. **Go to:** `https://codeproapp.online`

✅ **You should see:**
- Your CodePro homepage loads
- URL shows `https://` (padlock icon)
- No security warnings

**If you see 502/504 error:**
- Wait 2-3 minutes for containers to fully start
- Check logs: `docker-compose -f docker-compose.production.yml logs`

---

### Step 8.2: Test Authentication

1. **Click "Sign Up"** or "Get Started"
2. **Try signing up** with email or Google/GitHub
3. **Clerk authentication screen** should appear
4. **Complete sign-up**
5. **You should be redirected to dashboard**

✅ **Authentication works!**

---

### Step 8.3: Test Dashboard

1. **Check if dashboard loads** after login
2. **Look for:**
   - Your name/email displayed
   - Navigation menu works
   - No console errors (press `F12`, check Console tab)

---

### Step 8.4: Test GitHub Integration

1. **Try connecting a GitHub repository**
2. **Should redirect to GitHub OAuth**
3. **Authorize the app**
4. **Should redirect back to your app**

---

### Step 8.5: Test WebSocket

1. **Open browser Console** (F12 → Console tab)
2. **Look for:** `WebSocket connection established` or similar
3. **Should see no WebSocket errors**

---

### Step 8.6: Check Backend Health

**In terminal:**
```bash
curl https://codeproapp.online/health
```

✅ **Should return:**
```json
{
  "status":"OK",
  "timestamp":"...",
  "database":"connected",
  "WebSocket":"active"
}
```

---

### ✅ Phase 8 Complete!

Your app is live and working! 🎉

---

<a name="phase-9-webhook-configuration"></a>
## 🎣 Phase 9: Webhook Configuration
### ⏱️ Time: 10 minutes

> **What we're doing:** Configuring webhooks so external services can notify your app

---

### Step 9.1: Test Webhooks Are Accessible

**Make sure your app receives webhooks:**

```bash
curl -X POST https://codeproapp.online/api/webhooks/github \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

✅ **Should return some response** (not 404)

---

### Step 9.2: Configure GitHub Webhooks

**For each repository you want to monitor:**

1. **Go to repository on GitHub**
2. **Click "Settings"** tab
3. **Click "Webhooks"** in left sidebar
4. **Click "Add webhook"**
5. **Fill in:**
   - **Payload URL:** `https://codeproapp.online/api/webhooks/github`
   - **Content type:** `application/json`
   - **Secret:** Your `GITHUB_WEBHOOK_SECRET` from `.env.production`
6. **Which events?**
   - Select "Let me select individual events"
   - ✅ Pull requests
   - ✅ Pull request reviews
   - ✅ Pull request review comments
7. **✅ Active**
8. **Click "Add webhook"**

✅ **Webhook created!** GitHub will send a test ping.

---

### Step 9.3: Verify Clerk Webhook

**In Clerk Dashboard:**

1. **Go to:** https://dashboard.clerk.com
2. **Select your CodePro application**
3. **Click "Webhooks"** in sidebar
4. **Find your webhook:** `https://codeproapp.online/api/clerk/webhook`
5. **Click "Test"** to send a test event

✅ **Should show successful delivery**

---

### Step 9.4: Verify Stripe Webhook

**In Stripe Dashboard:**

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Find your webhook:** `https://codeproapp.online/api/stripe/webhook`
3. **Click "Send test webhook"**
4. **Choose event:** `customer.subscription.created`
5. **Click "Send test webhook"**

✅ **Should show 200 OK response**

---

### ✅ Phase 9 Complete!

All webhooks are configured and working!

---

<a name="maintenance--troubleshooting"></a>
## 🔧 Maintenance & Troubleshooting

### Daily Commands

**View logs:**
```bash
cd /var/www/codepro
docker compose -f docker-compose.production.yml logs -f
```
Press `Ctrl + C` to exit

**Check status:**
```bash
docker compose -f docker-compose.production.yml ps
```

**Restart all services:**
```bash
docker compose -f docker-compose.production.yml restart
```

**Restart specific service:**
```bash
docker compose -f docker-compose.production.yml restart backend
```

**View resource usage:**
```bash
docker stats
```
Press `Ctrl + C` to exit

---

### Deploying Updates

---

### Common Issues & Solutions

#### Issue: Can't connect to VPS

**Solution:**
```bash
# Check if SSH is running
systemctl status ssh

# Restart SSH
systemctl restart ssh
```

---

#### Issue: Containers won't start

**Solution:**
```bash
cd /var/www/codepro

# Check logs
docker compose -f docker-compose.production.yml logs

# Rebuild from scratch
docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml up --build -d
```

---

#### Issue: MongoDB connection failed

**Check:**
1. Is your VPS IP whitelisted in MongoDB Atlas?
2. Is connection string correct in `.env.production`?
3. Test connection:
```bash
docker exec -it codepro-backend sh
wget -q -O- localhost:5000/health
exit
```

---

#### Issue: Website shows 502 Bad Gateway

**Solutions:**
1. **Wait 2-3 minutes** - containers might still be starting
2. **Check backend is running:**
   ```bash
   docker compose -f docker-compose.production.yml ps
   curl http://localhost:5001/health
   ```
3. **Check Nginx:**
   ```bash
   systemctl status nginx
   nginx -t
   systemctl restart nginx
   ```

---

#### Issue: SSL/HTTPS not working

**With Cloudflare:**
1. Check Cloudflare dashboard → Status is "Active"
2. Check SSL/TLS mode is set to "Flexible"
3. "Always Use HTTPS" is enabled
4. Clear browser cache and try again

---

#### Issue: GitHub webhook not delivering

**Check:**
1. Webhook URL is correct: `https://codeproapp.online/api/webhooks/github`
2. Cloudflare firewall isn't blocking it
3. View delivery in GitHub → Repository → Settings → Webhooks → Click webhook → "Recent Deliveries"

---

### Monitoring & Maintenance

**Set up uptime monitoring:**
1. **Sign up:** https://uptimerobot.com (free)
2. **Add monitor:**
   - Type: HTTP(s)
   - URL: `https://codeproapp.online/health`
   - Interval: 5 minutes
3. **Get email alerts** if your site goes down

**Weekly tasks:**
- ✅ Check Docker logs for errors
- ✅ Review MongoDB usage
- ✅ Check disk space: `df -h`
- ✅ Review Cloudflare analytics

**Monthly tasks:**
- ✅ Update system: `apt update && apt upgrade -y`
- ✅ Review API usage (Gemini, Stripe)
- ✅ Check backup integrity
- ✅ Review security logs

---

### Backup Strategy

**Create backup script:**
```bash
nano /root/backup-codepro.sh
```

**Paste:**
```bash
#!/bin/bash
BACKUP_DIR="/root/backups/codepro"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup Redis
docker run --rm -v codepro_redis-data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/redis-$DATE.tar.gz -C /data .

# Backup .env
cp /var/www/codepro/.env.production $BACKUP_DIR/env-$DATE.backup

# Keep only last 7 backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

**Make executable:**
```bash
chmod +x /root/backup-codepro.sh
```

**Test it:**
```bash
/root/backup-codepro.sh
```

**Schedule daily backups (2 AM):**
```bash
crontab -e
```

**Add this line:**
```
0 2 * * * /root/backup-codepro.sh
```

---

### Performance Monitoring

**View system resources:**
```bash
# Install htop
apt install htop -y

# Run it
htop
```
Press `q` to quit

**Check disk usage:**
```bash
df -h
du -sh /var/www/codepro/*
```

**Monitor Docker:**
```bash
docker stats --no-stream
```

---

## 🎉 Congratulations!

**You've successfully deployed your CodePro SaaS application!**

### What You've Accomplished:

✅ **Set up 8 external services** (MongoDB, Clerk, GitHub, Gemini, Stripe, Cloudinary, Resend, Cloudflare)  
✅ **Configured VPS** with Docker, Nginx, and security  
✅ **Deployed application** with Docker containers  
✅ **Enabled HTTPS/SSL** via Cloudflare  
✅ **Setup auto-deployment** via GitHub Actions  
✅ **Configured webhooks** for real-time updates  
✅ **Implemented monitoring** and backups

### Your App Features:

🚀 **Live at:** https://codeproapp.online  
🔒 **Secure:** HTTPS, DDoS protection, Firewall  
⚡ **Fast:** Global CDN, optimized caching  
🔄 **Auto-deploy:** Push to GitHub → automatic deployment  
📊 **Scalable:** Docker containers, load balancing ready  
🛡️ **Protected:** Cloudflare WAF, bot protection

---

### Next Steps:

1. **Test all features thoroughly**
2. **Invite team members** via your app
3. **Connect GitHub repositories**
4. **Test AI code reviews**
5. **Monitor usage** and performance
6. **Set up domain email** (optional)
7. **Add monitoring** (UptimeRobot)
8. **Configure backups** (automated daily)

---

### Resources & Support:

📚 **Documentation:**
- Clerk Docs: https://clerk.com/docs
- Stripe Docs: https://stripe.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Cloudflare Docs: https://developers.cloudflare.com
- Docker Docs: https://docs.docker.com

🆘 **Quick Help:**
```bash
# View all logs
docker-compose -f docker-compose.production.yml logs -f

# Check container status
docker ps

# Restart everything
cd /var/www/codepro
docker-compose -f docker-compose.production.yml restart

# View system resources
htop
```

---

### Cost Summary:

| Service | Cost/Month |
|---------|------------|
| Hostinger VPS KVM2 | ₹499 (~$6) |
| MongoDB Atlas M10 | $57 |
| Clerk Pro | $25 |
| Cloudflare | FREE |
| Cloudinary | FREE (25GB) |
| Resend | FREE (3k emails) |
| **Total** | **~$88-100** |

**Plus variable costs:**
- Gemini AI: Pay-per-use (depends on reviews)  
- Stripe: 2.9% + $0.30 per transaction

---

## 🌟 You're Now a DevOps Pro!

You've just deployed a production-grade SaaS application with:
- Containerization (Docker)
- Reverse proxy (Nginx)
- CDN & DDoS protection (Cloudflare)
- CI/CD (GitHub Actions)
- Database (MongoDB)
- Caching (Redis)
- Real-time communication (WebSockets)
- AI integration (Gemini)
- Payment processing (Stripe)

**Amazing work! Share your success! 🎊**

---

**Made with ❤️ by Antigravity AI**  
**Happy Deploying! 🚀**
