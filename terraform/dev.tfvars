environment          = "dev"
component_name       = "pds-adaptor"

task_execution_role  = "ecsTaskExecutionRole"
task_family          = "pds-adaptor"

task_container_name  = "pds-adaptor-container"
task_image_name      = "deductions/pds-adaptor"
task_cpu             = 256
task_memory          = 512
task_container_port  = 3000
task_host_port       = 3000

service_container_port  = "3000" 
service_container_name  = "pds-adaptor-container"
service_desired_count   = "2"