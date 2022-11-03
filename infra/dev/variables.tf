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

variable "common_tags" {
  description = "Common tags you want applied to all components."
}