output "address" {
  value = aws_db_instance.main.address
}

output "port" {
  value = aws_db_instance.main.port
}

output "db_name" {
  value = aws_db_instance.main.db_name
}

output "db_user" {
  value = aws_db_instance.main.username
}

output "password" {
  value     = random_password.db.result
  sensitive = true
}

output "cloudmart_secret_arn" {
  value = aws_secretsmanager_secret.db.arn
}

output "cloudmart_password_secret" {
  value = "${aws_secretsmanager_secret.db.arn}:password::"
}
