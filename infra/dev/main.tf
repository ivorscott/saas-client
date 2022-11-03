terraform {
	required_version = ">= 0.15.5, <= 1.3.3"

	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "4.36.0"
		}
	}

	backend "s3" {
		bucket = "${var.domain_name}-terraform"
		key    = "prod/terraform.tfstate"
		region = "eu-west-1"
	}
}

provider "aws" {
	region = "eu-west-1"
}

provider "aws" {
	alias  = "acm_provider"
	region = "eu-central-1"
}