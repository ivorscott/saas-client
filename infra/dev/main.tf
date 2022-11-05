terraform {
	required_version = ">= 0.15.5, <= 1.3.3"

	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "4.36.0"
		}
	}

	backend "s3" {
		bucket = "devpie.io-terraform"
		key    = "dev/client/terraform.tfstate"
		region = "eu-central-1"
	}
}

module "website" {
	source = "github.com/devpies/saas-infra//modules/website?ref=main"
	stage = var.stage
	region = var.region
	domain_name = var.domain_name
	common_tags = var.common_tags
	force_delete = true
}