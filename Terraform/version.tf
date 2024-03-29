#### Configure backend ####
terraform {
    backend "gcs" {}
    required_providers {
        google = {
            source = "hashicorp/google"
            version = "~>5.10.0"
            }
        }
}