file_name = "/ai_files/test.txt"

# Open the file in write mode to overwrite it or create a new file
with open(file_name, "w") as file:
    file.write("MH15XX00234\n")
    file.write("camera2\n")
    file.write("06:55:10 ")

print(f"Data has been written to '{file_name}'.")
