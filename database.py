import mysql.connector

mydb = mysql.connector.connect(
  host = "localhost",
  user = "root",
  passwd = "Vw90e9w9jf0ejfr0wjfr0932",
)

my_cursor = mydb.cursor()

my_cursor.execute("CREATE DATABASE HSCdb")

