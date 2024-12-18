import sqlite3

def get_user_data(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # Vulnerable SQL query
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)

    return cursor.fetchall()

if __name__ == "__main__":
    # Simulate user input
    username = input("Enter username: ")
    print(get_user_data(username))
