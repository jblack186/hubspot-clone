import mysql.connector

mydb = mysql.connector.connect(
  host = "localhost",
  user = "root",
  passwd = "Vw90e9w9jf0ejfr0wjfr0932",
  database="HSCdb"
)

my_cursor = mydb.cursor()

# my_cursor.execute("CREATE DATABASE HSCdb")

# my_cursor.execute("CREATE TABLE users (name VARCHAR(255), email VARCHAR(255), user_id INTEGER AUTO_INCREMENT PRIMARY KEY)")

my_cursor.execute("SHOW TABLES")
