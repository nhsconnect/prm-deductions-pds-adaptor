data "aws_caller_identity" "current" {}

data "aws_ssm_parameter" "root_zone_id" {
  name = "/NHS/deductions-${data.aws_caller_identity.current.account_id}/root_zone_id"
}

data "aws_ssm_parameter" "authorization_keys" {
  name = "/NHS/${var.environment}-${data.aws_caller_identity.current.account_id}/pds-adaptor/authorization_keys"
}

data "aws_ssm_parameter" "pds_asid" {
  name = "/NHS/${var.environment}-${data.aws_caller_identity.current.account_id}/pds-adaptor/pds_asid"
}

data "aws_ssm_parameter" "deductions_asid" {
  name = "/NHS/${var.environment}-${data.aws_caller_identity.current.account_id}/pds-adaptor/deductions_asid"
}

data "aws_ssm_parameter" "mhs_url" {
  name = "/NHS/deductions-${data.aws_caller_identity.current.account_id}/mhs-${var.environment}/outbound_url"
}

data "aws_ssm_parameter" "deductions_private_ecs_cluster_id" {
  name = "/nhs/${var.environment}/deductions_private_ecs_cluster_id"
}

data "aws_ssm_parameter" "deductions_private_ecs_tasks_sg_id" {
  name = "/nhs/${var.environment}/deductions_private_ecs_tasks_sg_id"
}

data "aws_ssm_parameter" "deductions_private_private_subnets" {
  name = "/nhs/${var.environment}/deductions_private_private_subnets"
}

data "aws_ssm_parameter" "deductions_private_gp2gp_a_alb_tg_arn" {
  name = "/nhs/${var.environment}/deductions_private_gp2gp_a_alb_tg_arn"
}

data "aws_ssm_parameter" "deductions_private_pds_a_alb_tg_arn" {
  name = "/nhs/${var.environment}/deductions_private_pds_a_alb_tg_arn"
}

data "aws_ssm_parameter" "deductions_private_alb_dns" {
  name = "/nhs/${var.environment}/deductions_private_alb_dns"
}
