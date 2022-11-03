# S3 bucket for website.
resource "aws_s3_bucket" "www_bucket" {
  bucket = "www.${var.domain_name}"

  tags = var.common_tags
}

resource " aws_s3_bucket_acl" "www_bucket_acl" {
  bucket = "www.${var.domain_name}"
  acl    = "public-read"
  policy = templatefile("s3-policy.json", { bucket = "www.${var.domain_name}" })

  tags = var.common_tags
}

resource "aws_s3_bucket_cors_configuration" "www_cors_config" {
  bucket = "www.${var.domain_name}"

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["https://www.${var.domain_name}"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_website_configuration" "www_website_config" {
  bucket = "www.${var.domain_name}"

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# S3 bucket for redirecting non-www to www.
resource "aws_s3_bucket" "root_bucket" {
  bucket = var.domain_name

  tags = var.common_tags
}

resource " aws_s3_bucket_acl" "root_bucket_acl" {
  bucket = var.domain_name
  acl    = "public-read"
  policy = templatefile("s3-policy.json", { bucket = "www.${var.domain_name}" })

  tags = var.common_tags
}

resource "aws_s3_bucket_cors_configuration" "root_cors_config" {
  bucket = var.domain_name

  cors_rule {
    allowed_methods = []
    allowed_origins = []
  }
}

resource "aws_s3_bucket_website_configuration" "root_website_config" {
  bucket = var.domain_name

  redirect_all_requests_to = "https://www.${var.domain_name}"
}