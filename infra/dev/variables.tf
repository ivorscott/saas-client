
variable "acm_certificate" {
  description = "The ACM certificate arn."
  type        = string
}

variable "hosted_zone" {
  type        = string
  description = "The Route53 hosted zone"
}

variable "domain_name" {
  type        = string
  description = "The domain name for the website."
}

variable "bucket_name" {
  type        = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
}

variable "stage" {
  description = "The deployment stage."
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
}