/*
 * main.tf
 * author: evan kirkiles
 * created on Mon Aug 15 2022
 * 2022 the nobot space, 
 */

terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "<4.0.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  profile = "evan"
}

/* -------------------------------------------------------------------------- */
/*                                 DEFINITIONS                                */
/* -------------------------------------------------------------------------- */

/* ------------------------------ VERCEL / NEXT ----------------------------- */

# the vercel project with the website
resource "vercel_project" "papercraftclubt" {
  name      = "papercraftclub"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "evankirkiles/papercraftclub"
  }
}

# /* --------------------------------- S3 CDN --------------------------------- */

# module "cdn" {
#   source = "cloudposse/cloudfront-s3-cdn/aws"
#   namespace = "evankirkiles"
#   stage = "prod"
#   name = "static"
#   aliases = ["static.evankirkiles.com"]
#   dns_alias_enabled = true
#   parent_zone_name = "evankirkiles.com"
#   cors_allowed_origins = ["localhost:3000", "evankirkiles.com", "website-next-chi.vercel.app"]
# }