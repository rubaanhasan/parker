file_name = "./ai_files/test.txt"

# Open the file in write mode to overwrite it or create a new file
with open(file_name, "w") as file:
    file.write("darshan\n")
    file.write("camera1\n")
    file.write("06:55:10 ")

print(f"Data has been written to '{file_name}'.")
