# ☁️ CloudMart Infrastructure Platform

A cloud-native deployment platform built using **AWS, Terraform, Kubernetes, ECS Fargate, GitHub Actions, and ArgoCD**.

CloudMart showcases a hybrid deployment architecture where the same containerized application is deployed on both **Amazon EKS** and **Amazon ECS** using Infrastructure as Code and GitOps workflows.

---

# 🚀 Features

- Infrastructure provisioning using Terraform
- Amazon EKS Kubernetes deployment
- Amazon ECS Fargate deployment
- CI/CD automation using GitHub Actions
- GitOps deployment using ArgoCD
- PostgreSQL RDS database integration
- CloudWatch monitoring and dashboards
- ECS and Kubernetes autoscaling
- Secure secret management using AWS Secrets Manager
- Production-style VPC architecture

---

# 🏗️ Architecture Overview

```text
                    ┌──────────────────┐
                    │      Users       │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ Application Load │
                    │    Balancer      │
                    └────────┬─────────┘
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
 ┌────────▼────────┐                 ┌──────────▼─────────┐
 │   Amazon ECS    │                 │    Amazon EKS      │
 │    Fargate      │                 │   Kubernetes App   │
 └────────┬────────┘                 └──────────┬─────────┘
          │                                     │
          └──────────────────┬──────────────────┘
                             │
                    ┌────────▼─────────┐
                    │   PostgreSQL RDS │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   CloudWatch     │
                    │ Monitoring/Logs  │
                    └──────────────────┘
```

---

# ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| AWS | Cloud Infrastructure |
| Terraform | Infrastructure as Code |
| Docker | Containerization |
| Kubernetes | Container Orchestration |
| Amazon EKS | Managed Kubernetes |
| Amazon ECS | Serverless Containers |
| GitHub Actions | CI/CD Pipeline |
| ArgoCD | GitOps Deployment |
| PostgreSQL | Relational Database |
| CloudWatch | Monitoring & Logging |

---

# 📁 Project Structure

```text
terraform/
│
├── environments/
│   ├── dev/
│   └── prod/
│
├── modules/
│   ├── network/
│   ├── eks/
│   ├── ecs/
│   ├── rds/
│   ├── monitoring/
│   └── argocd/
│
k8s/
└── web-app/
```

---

# 🧩 Terraform Modules

| Module | Description |
|---|---|
| network | Creates VPC, subnets, route tables, NAT gateway |
| eks | Deploys Amazon EKS cluster and worker nodes |
| ecs | Creates ECS Fargate services and ALB |
| rds | Deploys PostgreSQL RDS instance |
| monitoring | CloudWatch dashboards and alarms |
| argocd | ArgoCD installation and GitOps sync |

---

# 🔐 AWS Credentials Setup

Create an IAM Role for GitHub Actions OIDC integration.

Add the following repository secret inside GitHub:

```text
AWS_GITHUB_ACTIONS_ROLE_ARN=arn:aws:iam::<account-id>:role/<role-name>
```

---

# 🛠️ Terraform Setup

## Configure Terraform Variables

```powershell
notepad terraform/environments/dev/terraform.tfvars
```

For production:

```powershell
terraform/environments/prod/terraform.tfvars
```

---

## Configure Remote Backend (Optional)

```powershell
Copy-Item terraform/environments/dev/backend.tf.example terraform/environments/dev/backend.tf
```

---

# ☁️ Infrastructure Deployment

## Initialize Terraform

```powershell
cd terraform/environments/dev
terraform init
```

---

## Review Execution Plan

```powershell
terraform plan -var-file=terraform.tfvars
```

---

## Apply Infrastructure

```powershell
terraform apply -var-file=terraform.tfvars
```

---

# 🔄 CI/CD Pipeline

The GitHub Actions workflow performs the following steps automatically:

1. Build Docker image
2. Authenticate with Amazon ECR
3. Create ECR repository if missing
4. Push image to ECR
5. Update deployment manifests
6. Trigger ArgoCD synchronization

---

# 🐳 Docker Image Strategy

Every deployment pushes two image tags:

- `latest`
- Git commit SHA

Deploy a specific image version:

```powershell
terraform apply -var-file=terraform.tfvars -var "image_tag=<git-sha>"
```

---

# ☸️ Kubernetes Deployment

The Kubernetes deployment includes:

- Rolling updates
- Readiness and liveness probes
- Horizontal Pod Autoscaler (HPA)
- Service Load Balancer
- GitOps synchronization using ArgoCD

Kubernetes manifests are stored inside:

```text
k8s/web-app
```

---

# 📊 Monitoring & Observability

CloudWatch monitoring includes:

- ECS CPU and memory metrics
- Application logs
- EKS node monitoring
- ALB health metrics
- Infrastructure dashboards
- CloudWatch alarms

---

# 🛡️ Security Practices

The project follows multiple cloud security best practices:

- Private subnet deployment
- IAM least privilege access
- Secrets Manager integration
- Security groups and subnet isolation
- Encrypted RDS storage
- Non-root Docker containers

---

# 🌍 High Availability Design

The infrastructure supports:

- Multi-AZ deployment
- Autoscaling
- Load balancing
- Self-healing Kubernetes workloads
- Disaster recovery expansion
- Route53 failover integration

---

# 🔮 Future Improvements

- HTTPS with ACM and Route53
- Multi-region deployment
- Redis caching layer
- WAF integration
- Blue-Green deployments
- Prometheus + Grafana monitoring
- External Secrets Operator

---

# 👨‍💻 Author

**Lakshit Tyagi**

## 🔗 GitHub Repository

[Cloudmart GitHub Repository](https://github.com/Lukky175/Cloudmart.git)