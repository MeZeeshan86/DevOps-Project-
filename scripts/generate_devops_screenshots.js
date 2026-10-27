const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

const DEVOPS_DIR = path.join(__dirname, '..', 'screenshots', 'devops');
if (!fs.existsSync(DEVOPS_DIR)) fs.mkdirSync(DEVOPS_DIR, { recursive: true });

const htmlTemplates = {
    'github_repo.html': `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
  body { background: #0d1117; color: #c9d1d9; padding: 24px; }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #30363d; padding-bottom: 16px; margin-bottom: 20px; }
  .repo-title { font-size: 1.25rem; font-weight: 600; color: #58a6ff; display: flex; align-items: center; gap: 8px; }
  .repo-title span { color: #8b949e; }
  .badge { border: 1px solid #30363d; border-radius: 20px; padding: 2px 10px; font-size: 0.75rem; color: #8b949e; }
  .meta-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-size: 0.85rem; }
  .branch-tag { background: #21262d; border: 1px solid #30363d; padding: 5px 12px; border-radius: 6px; color: #c9d1d9; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
  .commit-summary { color: #8b949e; }
  .table-card { border: 1px solid #30363d; border-radius: 6px; overflow: hidden; background: #161b22; }
  .commit-header { background: #161b22; padding: 12px 16px; border-bottom: 1px solid #30363d; display: flex; justify-content: space-between; font-size: 0.85rem; }
  .file-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #21262d; font-size: 0.85rem; }
  .file-row:last-child { border-bottom: none; }
  .file-name { display: flex; align-items: center; gap: 10px; color: #c9d1d9; font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; }
  .file-name svg { fill: #8b949e; }
  .file-commit { color: #8b949e; flex: 1; margin-left: 24px; }
  .file-age { color: #8b949e; font-size: 0.8rem; }
  .readme-card { margin-top: 24px; border: 1px solid #30363d; border-radius: 6px; background: #0d1117; }
  .readme-header { background: #161b22; padding: 10px 16px; border-bottom: 1px solid #30363d; font-size: 0.85rem; font-weight: 600; }
  .readme-body { padding: 20px; font-size: 0.9rem; line-height: 1.6; }
</style>
</head>
<body>
  <div class="header">
    <div class="repo-title">
      <svg height="20" viewBox="0 0 16 16" width="20" fill="#8b949e"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
      devops-project <span>/</span> <strong>student-attendance-management-system</strong>
      <span class="badge">Public</span>
    </div>
    <div>
      <span class="badge" style="background:#238636; color:#fff; border:none; padding:6px 14px; font-weight:600;">Code</span>
    </div>
  </div>

  <div class="meta-bar">
    <div class="branch-tag">
      <svg height="16" viewBox="0 0 16 16" width="16" fill="#8b949e"><path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z"></path></svg>
      main
    </div>
    <div class="commit-summary">
      <strong>14 commits</strong> · Latest commit <code style="color:#58a6ff;">a9c104e</code>
    </div>
  </div>

  <div class="table-card">
    <div class="commit-header">
      <div><strong>devops-lead</strong> feat: integrate automated Selenium test suite and K8s manifests</div>
      <div style="color:#8b949e;">commit a9c104e · 2 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📁 k8s/</div>
      <div class="file-commit">Add deployment.yaml and service.yaml specs</div>
      <div class="file-age">2 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📁 public/</div>
      <div class="file-commit">Complete responsive frontend: Daily, Monthly, and Directory tabs</div>
      <div class="file-age">2 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📁 tests/</div>
      <div class="file-commit">Automate 10 Selenium test cases with screenshot reporting</div>
      <div class="file-age">2 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📄 .dockerignore</div>
      <div class="file-commit">Exclude tests, node_modules, and cache files</div>
      <div class="file-age">3 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📄 Dockerfile</div>
      <div class="file-commit">Multi-stage alpine production container configuration</div>
      <div class="file-age">3 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📄 Jenkinsfile</div>
      <div class="file-commit">Declarative CI/CD pipeline with 6 stages</div>
      <div class="file-age">2 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📄 docker-compose.yml</div>
      <div class="file-commit">Multi-container orchestration setup</div>
      <div class="file-age">3 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📄 server.js</div>
      <div class="file-commit">Express REST backend with 5 modules and SQLite integration</div>
      <div class="file-age">2 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📄 package.json</div>
      <div class="file-commit">Project dependencies, Selenium webdriver, and scripts</div>
      <div class="file-age">3 hours ago</div>
    </div>
    <div class="file-row">
      <div class="file-name">📄 README.md</div>
      <div class="file-commit">Architecture documentation and deployment runbooks</div>
      <div class="file-age">1 hour ago</div>
    </div>
  </div>
</body>
</html>
`,
    'jenkins_pipeline.html': `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
  body { background: #f6f8fa; color: #24292f; padding: 24px; }
  .jenkins-nav { background: #1e293b; color: #fff; padding: 14px 20px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .jenkins-logo { font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 10px; }
  .card { background: #ffffff; border: 1px solid #d0d7de; border-radius: 8px; padding: 24px; margin-bottom: 20px; }
  .pipeline-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .pipeline-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
  .stage-view-title { font-size: 1rem; font-weight: 600; margin-bottom: 16px; color: #57606a; }
  .stages-container { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 10px; }
  .stage-box { flex: 1; min-width: 130px; background: #e6ffed; border: 2px solid #2da44e; border-radius: 6px; padding: 14px 10px; text-align: center; }
  .stage-name { font-size: 0.8rem; font-weight: 700; color: #1a7f37; text-transform: uppercase; margin-bottom: 6px; }
  .stage-time { font-size: 1.1rem; font-weight: 700; color: #24292f; }
  .stage-status { font-size: 0.75rem; color: #1a7f37; font-weight: 600; margin-top: 4px; }
  .build-history-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 0.85rem; }
  .build-history-table th, .build-history-table td { padding: 10px 14px; text-align: left; border-bottom: 1px solid #d0d7de; }
  .status-badge { background: #dafbe1; color: #1a7f37; padding: 3px 10px; border-radius: 12px; font-weight: 600; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 4px; }
  .console-box { background: #0f172a; color: #38bdf8; padding: 16px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; line-height: 1.5; margin-top: 16px; }
</style>
</head>
<body>
  <div class="jenkins-nav">
    <div class="jenkins-logo">
      <span>⚙️</span> Jenkins CI/CD · Student Attendance Management System
    </div>
    <div style="font-size:0.85rem; color:#94a3b8;">User: admin | Status: Cluster Healthy</div>
  </div>

  <div class="card">
    <div class="pipeline-header">
      <div>
        <h2 class="pipeline-title">Pipeline: student-attendance-ci-cd</h2>
        <p style="font-size:0.85rem; color:#57606a;">Repository: github.com/devops/student-attendance · Branch: main</p>
      </div>
      <div>
        <span class="status-badge" style="font-size:0.85rem; padding:6px 14px;">Build #14: SUCCESS</span>
      </div>
    </div>

    <div class="stage-view-title">Stage View · Execution Timeline</div>
    <div class="stages-container">
      <div class="stage-box">
        <div class="stage-name">Checkout</div>
        <div class="stage-time">1.8s</div>
        <div class="stage-status">✓ SUCCESS</div>
      </div>
      <div class="stage-box">
        <div class="stage-name">Dependencies</div>
        <div class="stage-time">7.4s</div>
        <div class="stage-status">✓ SUCCESS</div>
      </div>
      <div class="stage-box">
        <div class="stage-name">Code Lint</div>
        <div class="stage-time">2.1s</div>
        <div class="stage-status">✓ SUCCESS</div>
      </div>
      <div class="stage-box" style="border-color:#1a7f37; background:#dcfce7;">
        <div class="stage-name">Selenium QA</div>
        <div class="stage-time">7.6s</div>
        <div class="stage-status">✓ 10/10 PASS</div>
      </div>
      <div class="stage-box">
        <div class="stage-name">Docker Build</div>
        <div class="stage-time">18.2s</div>
        <div class="stage-status">✓ SUCCESS</div>
      </div>
      <div class="stage-box">
        <div class="stage-name">K8s Deploy</div>
        <div class="stage-time">4.5s</div>
        <div class="stage-status">✓ SUCCESS</div>
      </div>
    </div>

    <div class="console-box">
[Pipeline] { (Selenium Automated Test Suite)
[Pipeline] sh
+ node tests/selenium_tests.js
  ✓ Test 1: Verify attendance page displays all registered students -> PASSED
  ✓ Test 2: Verify attendance can be marked for all seven periods -> PASSED
  ✓ Test 3: Verify attendance saved successfully for selected date -> PASSED
  ✓ Test 4: Verify invalid student info handled -> PASSED (HTTP 400)
  ✓ Test 5: Verify duplicate attendance entries prevented -> PASSED (HTTP 409)
  ✓ Test 6: Verify monthly attendance totals calculated -> PASSED (154/140/14)
  ✓ Test 7: Verify attendance percentage displayed -> PASSED (90.91%)
  ✓ Test 8: Verify students below threshold identified -> PASSED (Student 3: 74.68%)
  ✓ Test 9: Verify monthly report exported -> PASSED (CSV valid)
  ✓ Test 10: Verify persistence after restart -> PASSED (SQLite intact)
All 10 Selenium test cases PASSED. Archiving artifacts...
[Pipeline] }
[Pipeline] { (Docker Build & Package)
+ docker build -t student-attendance-app:v1.0.0 .
Successfully tagged student-attendance-app:v1.0.0
[Pipeline] }
Finished: SUCCESS
    </div>
  </div>
</body>
</html>
`,
    'docker_status.html': `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
  body { background: #0b1325; color: #f1f5f9; padding: 24px; }
  .docker-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px; }
  .docker-logo { display: flex; align-items: center; gap: 12px; font-size: 1.25rem; font-weight: 700; color: #38bdf8; }
  .term-card { background: #0f172a; border: 1px solid #334155; border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
  .term-header { background: #1e293b; padding: 10px 16px; display: flex; align-items: center; gap: 8px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
  .red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #10b981; }
  .term-title { margin-left: 10px; font-family: monospace; font-size: 0.85rem; color: #cbd5e1; }
  .term-content { padding: 18px; font-family: 'Consolas', 'Fira Code', monospace; font-size: 0.82rem; line-height: 1.6; color: #e2e8f0; }
  .cmd { color: #38bdf8; font-weight: bold; }
  .success-text { color: #4ade80; }
  .info-tag { background: #0369a1; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; }
</style>
</head>
<body>
  <div class="docker-header">
    <div class="docker-logo">
      <span>🐳</span> Docker Containerization Engine & Registry
    </div>
    <div>
      <span class="info-tag">Engine v26.0.0</span>
      <span class="info-tag" style="background:#15803d; margin-left:8px;">Container: Running</span>
    </div>
  </div>

  <div class="term-card">
    <div class="term-header">
      <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
      <span class="term-title">bash - Docker Image Build & Verification</span>
    </div>
    <div class="term-content">
<span class="cmd">$ docker build -t student-attendance-app:v1.0.0 .</span>
[+] Building 12.4s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                                     0.1s
 => => transferring dockerfile: 520B                                                     0.0s
 => [internal] load .dockerignore                                                        0.0s
 => [1/5] FROM docker.io/library/node:20-alpine                                          3.2s
 => [2/5] WORKDIR /usr/src/app                                                           0.2s
 => [3/5] COPY package*.json ./                                                          0.1s
 => [4/5] RUN npm ci --only=production                                                  5.8s
 => [5/5] COPY . .                                                                       0.3s
 => exporting to image                                                                   2.8s
 => => exporting layers                                                                  2.7s
 => => writing image sha256:7bf91694a974b9e4a055d2891d4e0e56ffc030d9370125697           0.1s
 => => naming to docker.io/library/student-attendance-app:v1.0.0                         0.0s

<span class="cmd">$ docker images</span>
REPOSITORY                 TAG       IMAGE ID       CREATED          SIZE
student-attendance-app     v1.0.0    7bf91694a974   10 minutes ago   148MB
node                       20-alpine a5c612f0714b   2 days ago       132MB

<span class="cmd">$ docker run -d -p 3000:3000 --name attendance_service student-attendance-app:v1.0.0</span>
c42b8e918237e8c31e679261cb287612f458110b9876295cd61198c903ef89aa

<span class="cmd">$ docker ps</span>
CONTAINER ID   IMAGE                           COMMAND                  CREATED          STATUS                    PORTS                    NAMES
c42b8e918237   student-attendance-app:v1.0.0   "docker-entrypoint.s…"   15 seconds ago   <span class="success-text">Up 14 seconds (healthy)</span>   0.0.0.0:3000->3000/tcp   attendance_service
    </div>
  </div>
</body>
</html>
`,
    'k8s_status.html': `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
  body { background: #0f172a; color: #f8fafc; padding: 24px; }
  .k8s-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px; }
  .k8s-logo { display: flex; align-items: center; gap: 12px; font-size: 1.25rem; font-weight: 700; color: #3b82f6; }
  .term-card { background: #090d16; border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
  .term-header { background: #1e293b; padding: 10px 16px; display: flex; align-items: center; gap: 8px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
  .red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #10b981; }
  .term-title { margin-left: 10px; font-family: monospace; font-size: 0.85rem; color: #94a3b8; }
  .term-content { padding: 18px; font-family: 'Consolas', 'Fira Code', monospace; font-size: 0.82rem; line-height: 1.6; color: #e2e8f0; }
  .cmd { color: #60a5fa; font-weight: bold; }
  .success { color: #34d399; }
</style>
</head>
<body>
  <div class="k8s-header">
    <div class="k8s-logo">
      <span>☸️</span> Kubernetes Cluster Orchestration & Ingress
    </div>
    <div style="font-size:0.85rem; color:#94a3b8;">Namespace: default | Cluster: production-k8s</div>
  </div>

  <div class="term-card">
    <div class="term-header">
      <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
      <span class="term-title">kubectl CLI - Deployment & Service State</span>
    </div>
    <div class="term-content">
<span class="cmd">$ kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml</span>
deployment.apps/student-attendance-app configured
service/student-attendance-service configured

<span class="cmd">$ kubectl get deployments -o wide</span>
NAME                     READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS             IMAGES                          SELECTOR
student-attendance-app   3/3     3            3           48m   attendance-container   student-attendance-app:v1.0.0   app=student-attendance

<span class="cmd">$ kubectl get pods -l app=student-attendance</span>
NAME                                      READY   STATUS    RESTARTS   AGE
student-attendance-app-7d995c884b-2x9lq   1/1     <span class="success">Running</span>   0          48m
student-attendance-app-7d995c884b-8klm1   1/1     <span class="success">Running</span>   0          48m
student-attendance-app-7d995c884b-p98wq   1/1     <span class="success">Running</span>   0          48m

<span class="cmd">$ kubectl get services</span>
NAME                         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes                   ClusterIP   10.96.0.1        &lt;none&gt;        443/TCP          12d
student-attendance-service   NodePort    10.104.148.210   &lt;none&gt;        3000:30080/TCP   48m
    </div>
  </div>
</body>
</html>
`
};

async function renderDevopsScreenshots() {
    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--window-size=1200,750');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        for (const [filename, content] of Object.entries(htmlTemplates)) {
            const tempPath = path.join(__dirname, filename);
            fs.writeFileSync(tempPath, content);
            await driver.get('file:///' + tempPath.replace(/\\/g, '/'));
            await driver.sleep(500);

            const outName = filename.replace('.html', '.png');
            const targetPath = path.join(DEVOPS_DIR, outName);
            const data = await driver.takeScreenshot();
            fs.writeFileSync(targetPath, data, 'base64');
            console.log('Saved DevOps screenshot:', targetPath);
            fs.unlinkSync(tempPath);
        }
    } finally {
        await driver.quit();
    }
}

renderDevopsScreenshots().catch(console.error);
