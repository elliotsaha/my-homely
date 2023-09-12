# Register Docker Image on AWS ECS (Elastic Container Service)
cd /home/ec2-user/raja/rScripts
aws ecr get-login-password --region ca-central-1 | docker login --username AWS --password-stdin 329009514794.dkr.ecr.ca-central-1.amazonaws.com
docker build -t raja-model .
docker tag raja-model:latest 329009514794.dkr.ecr.ca-central-1.amazonaws.com/raja-model:avm
docker push 329009514794.dkr.ecr.ca-central-1.amazonaws.com/raja-model:avm
# Locaction: https://ca-central-1.console.aws.amazon.com/ecr/repositories?region=ca-central-1



