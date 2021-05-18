import mysql.connector

from getpass import getpass
from mysql.connector import connect, Error

try:
    with connect(
        host="localhost",
        user = "root",
        passwd = "Vw90e9w9jf0ejfr0wjfr0932",
        database="HSCdb"
    ) as connection:
        print(connection)
except Error as e:
    print(e)

# mydb = mysql.connector.connect(
#   host = "localhost",
#   user = "root",
#   passwd = "Vw90e9w9jf0ejfr0wjfr0932",
#   database="HSCdb"
# )
        # user=input("Enter username: "),
        # password=getpass("Enter password: "),


# my_cursor = mydb.cursor()
# cursor = connection.cursor()

# my_cursor.execute("CREATE DATABASE HSCdb")

my_cursor.execute("CREATE TABLE newUsers (name VARCHAR(255), email VARCHAR(255), user_id INTEGER AUTO_INCREMENT PRIMARY KEY)")

# my_cursor.execute("SHOW TABLES")
