![AWS](https://img.shields.io/badge/AWS-Cloud-orange)
![Terraform](https://img.shields.io/badge/Terraform-IaC-purple)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-black)

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


---

# 📝 Assignment Answers

## (a) Architecture Design

The infrastructure is deployed inside a custom AWS VPC spread across multiple Availability Zones for high availability. Public subnets are used for Application Load Balancers and NAT Gateway access, while private subnets host Amazon EKS worker nodes, ECS Fargate tasks, PostgreSQL RDS, and future Redis/ElastiCache integration.

The application is deployed on both Amazon ECS and Amazon EKS to demonstrate hybrid container orchestration strategies. ECS services are exposed using an Application Load Balancer, while Kubernetes workloads are deployed using Kubernetes Services and GitOps workflows through ArgoCD.

For multi-region failover, the same Terraform stack can be deployed in a secondary AWS region. Route53 health checks and DNS failover policies can redirect traffic automatically if the primary region becomes unavailable.

### High Availability Strategy

- Multi-AZ deployment
- ECS and Kubernetes autoscaling
- Load balancing using ALB
- Self-healing Kubernetes workloads
- Health checks and rolling deployments

### Security Considerations

- Private subnet deployment for backend infrastructure
- Security groups restricting inbound traffic
- AWS Secrets Manager for sensitive credentials
- IAM role-based access control
- Encrypted database storage

### Cost Optimization Trade-offs

The project uses lightweight infrastructure for development environments, including `t3.small` worker nodes, minimal ECS task sizing, and autoscaling to avoid over-provisioning and reduce operational cost.

---

## (b) Terraform Strategy

Terraform is structured using reusable modules for infrastructure organization and maintainability.

### Core Modules

- `network`
- `eks`
- `ecs`
- `rds`
- `monitoring`
- `argocd`

Each environment uses separate folders (`dev` and `prod`) to maintain isolated infrastructure configurations and variable management.

### Remote State Management

Terraform remote state can be configured using:
- Amazon S3 for state storage
- DynamoDB for state locking

This prevents concurrent infrastructure modifications and state corruption.

### Multi-region Provisioning

Multi-region deployment can be achieved using:
- Terraform provider aliases
- Separate environment folders
- Separate remote state files per region

### Challenges Handled

- Dependency ordering through Terraform outputs
- State drift prevention using IaC workflows
- Region synchronization through modular design
- Environment isolation using separate variable configurations

---

## (c) Docker & Image Strategy

The application uses optimized Docker containers for production deployment.

### Optimization Techniques

- Multi-stage Docker builds
- Alpine Linux base images
- Non-root container execution
- Production dependency installation only

### Image Versioning

Docker images are stored in Amazon ECR and tagged using:
- `latest`
- Git commit SHA

This improves traceability and rollback support.

### Vulnerability Reduction

- Minimal container packages
- Lightweight base images
- Non-root execution
- Image scanning enabled in ECR

### CI/CD Integration

GitHub Actions automatically:
1. Builds Docker images
2. Pushes images to Amazon ECR
3. Updates Kubernetes manifests
4. Triggers ArgoCD deployment synchronization

---

## (d) Kubernetes Deployment

The Kubernetes deployment is designed for scalability and zero downtime.

### Zero-Downtime Deployment

CloudMart uses rolling deployments with readiness and liveness probes to ensure zero-downtime application updates.

### Autoscaling

Horizontal Pod Autoscaler (HPA) is used for CPU-based autoscaling to dynamically increase or decrease pod replicas depending on workload demand.

### Secret Management

Sensitive data is managed using:
- Kubernetes Secrets
- AWS Secrets Manager integration

No credentials are hardcoded inside application source code.

### Inter-service Communication

Services communicate internally using:
- Kubernetes ClusterIP services
- Internal DNS-based service discovery

### GitOps Workflow

ArgoCD continuously monitors the Git repository and automatically synchronizes Kubernetes manifests with the EKS cluster.

---

## (e) CI/CD Pipeline Design

The project implements a CI/CD pipeline using GitHub Actions and ArgoCD.

### Pipeline Stages

1. Source code checkout
2. Docker image build
3. Amazon ECR authentication
4. Docker image push
5. Kubernetes manifest update
6. ArgoCD synchronization

### Trigger Mechanism

The pipeline automatically triggers on:
- Push events to the `main` branch
- Manual workflow dispatch

### Failure Handling & Rollback

Rollback can be performed by:
- Reverting Git commits
- Redeploying older Docker image tags
- Re-syncing deployments through ArgoCD

---

## (f) Failure & Failover Scenario

If the primary AWS region becomes unavailable, Route53 DNS failover policies can redirect traffic to a secondary region.

### Traffic Failover

Traffic routing is handled using:
- Route53 health checks
- DNS-based failover policies

### Data Consistency

Cross-region replication strategies can be implemented using:
- PostgreSQL read replicas
- Amazon Aurora Global Database
- Amazon ElastiCache Global Datastore

### AWS Services Used

- Route53
- Amazon RDS
- Amazon ECR
- CloudWatch
- Terraform
- ArgoCD

---
