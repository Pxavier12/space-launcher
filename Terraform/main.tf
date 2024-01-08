variable "project_id" {
  type = string
}
variable "region" {
  type = string
}
variable "zone" {
    type = string
}
variable "tf_service_account" {
    type = string
}
provider "google" {
    project = var.project_id
    region = var.region
    zone = var.zone
    impersonate_service_account = var.tf_service_account
}