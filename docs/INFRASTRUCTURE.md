# INFRASTRUCTURE

This guide explains how to provision and configure the production server using Terraform and Ansible.

## Initialize Google Cloud
1. Authenticate locally:

```bash
gcloud auth application-default login
```

## Terraform Setup

1. Install [Terraform](https://www.terraform.io/downloads) and the Google Cloud CLI.
2. Edit `infra/terraform/main.tf` with your project ID and service account email.
3. Initialize the working directory:
   ```bash
   cd infra/terraform
   terraform init
   ```
4. Apply the configuration to create the VM and firewall rules:
   ```bash
   terraform apply
   ```
   The public IP output will be used by Ansible.

## Ansible Provisioning

1. Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/index.html).
2. Export the environment variables referenced in `infra/ansible/group_vars/all/vault.yml`.
3. Update `infra/ansible/inventory.yml` with the VM IP and your OS login user.
4. Run the playbook:
   ```bash
   cd infra/ansible
   ansible-playbook -i inventory.yml site.yml
   ```
   This installs dependencies, sets up PostgreSQL, and configures Gunicorn and Nginx.

## Updating denuoweb-vm

The current VM runs the application from `/opt/QuestByCycle` as `questadmin`. Its
systemd units are `questbycycle.service` and `questbycycle-rqworker.service`.
They use the Poetry Python 3.11 environment for that directory. The VM has
Node 18, while the frontend requires Node 20.19 or newer, so build the
frontend on a compatible machine and deploy `app/static/dist/` with the source
and lockfiles.

Connect through Identity-Aware Proxy:

```bash
gcloud compute ssh denuoweb-vm --zone=us-west1-b --tunnel-through-iap
```

After copying a tested release to `/opt/QuestByCycle`, install its locked
Python dependencies as `questadmin`, then restart both services:

```bash
cd /opt/QuestByCycle
sudo -u questadmin /home/questadmin/.local/bin/poetry install --no-interaction
sudo systemctl restart questbycycle.service questbycycle-rqworker.service
sudo systemctl status questbycycle.service questbycycle-rqworker.service --no-pager
```

Check the application through Nginx after the restart. The Ansible playbook
above describes a separate prod/dev layout and does not match these live
systemd units.
