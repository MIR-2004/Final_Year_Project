# Meet-AI: 100% Free AWS EC2 Deployment Guide

This guide describes how to deploy your Next.js application to a free AWS EC2 instance using Docker Compose and GitHub Actions CI/CD.

---

## 🏗️ Architecture Overview
- **AWS EC2:** Host both your Next.js application container and the Redis container on a single virtual machine.
- **Docker Compose:** Coordinate and run the containers (`meet_ai_web` and `meet_ai_redis`) in the background.
- **GitHub Actions CI/CD:** Automatically SSH into your EC2 server, pull the latest code, and rebuild the containers on every push to the `main` branch.

---

## 🚀 Step 1: Launch Your Free EC2 Server
1. Sign in to the **AWS Management Console**.
2. Go to the **EC2 Dashboard** and click **Launch instance**.
3. Configure the instance details:
   - **Name:** `meet-ai-server`
   - **OS (AMI):** **Ubuntu** (select the `Ubuntu Server 24.04 LTS` marked as **Free tier eligible**).
   - **Instance Type:** **`t2.micro`** (or `t3.micro` depending on region eligibility).
   - **Key Pair:** Create a new key pair named `meet-ai-key.pem` and download it.
   - **Security Group (Firewall):**
     - Allow **SSH** (Port 22) from anywhere (or restrict to your IP for maximum security).
     - Allow **HTTP** (Port 80) from anywhere.
4. Click **Launch instance**.
5. Note down your instance's **Public IPv4 Address** (e.g. `54.12.34.56`).

---

## 🛡️ Step 2: Open Port 3000 in Security Settings
Since Next.js runs on port `3000`, you must configure AWS to allow public traffic on this port.
1. Click your running instance in the EC2 console.
2. Go to the **Security** tab and click on the **Security Groups** ID.
3. Click **Edit inbound rules** -> **Add rule**.
4. Set **Type** to `Custom TCP`, **Port Range** to `3000`, and **Source** to `Anywhere-IPv4` (`0.0.0.0/0`).
5. Click **Save rules**.

---

## 🛠️ Step 3: Server Configuration (Run once via SSH)
Connect to your server to install Docker and clone the code:
1. Open a terminal on your local machine and navigate to the directory containing your downloaded `meet-ai-key.pem` key.
2. Secure the file permissions:
   ```bash
   chmod 400 meet-ai-key.pem
   ```
3. Connect to the EC2 server (replace with your public IP):
   ```bash
   ssh -i meet-ai-key.pem ubuntu@YOUR_EC2_IP
   ```
4. Update the package list and install Docker:
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   sudo apt-get install -y docker.io
   ```
5. Permit user `ubuntu` to run Docker without prefixing `sudo`:
   ```bash
   sudo usermod -aG docker ubuntu
   # Re-login to apply group settings
   exec su -l ubuntu
   ```
6. Clone the repository and configure the production environments:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/Meet-AI.git
   cd Meet-AI
   nano .env
   ```
7. Paste your project credentials into the `.env` file (e.g., `DATABASE_URL`, `BETTER_AUTH_SECRET`, etc.). 
   > [!TIP]
   > Make sure `REDIS_URL` in your server's `.env` is set to `redis://redis:6379` so the web service connects to the containerized Redis service.
8. Save and exit the text editor (`Ctrl + O` -> `Enter` to save, `Ctrl + X` to exit).

---

## 🔄 Step 4: Configure GitHub Repository Secrets
To link GitHub CI/CD to your EC2 instance, go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**:

1. **`EC2_HOST`**: Your EC2 instance's Public IP (e.g., `54.12.34.56`).
2. **`EC2_SSH_KEY`**: Open the downloaded `meet-ai-key.pem` file in a text editor, copy its entire contents (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`), and paste it as the secret value.

---

## ⚡ Step 5: Trigger Deploy
Commit and push files to your `main` branch:
```bash
git add .
git commit -m "chore: setup free EC2 deployment"
git push origin main
```
Your GitHub Actions pipeline will:
- Run code validation checks (ESLint / Next Build checks).
- SSH securely into your EC2 server.
- Run `git pull` to fetch changes.
- Execute `docker compose up -d --build` to automatically rebuild and launch the updated containers in the background!
- The app will be live at `http://YOUR_EC2_IP:3000`.
