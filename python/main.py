import pandas as pd

def main():
    file_path = '../uploads/patients.csv'

    try:
        df = pd.read_csv(file_path)

        print("Data loaded successfully!")
        print(f"DataFrame shape: {df.shape}")
        print("First 5 rows:")
        print(df.head())

    except FileNotFoundError:
        print(f"Error: The file was not found at the path: {file_path}")
        print("Please check your file path and ensure the file exists.")
    except Exception as e:
        print(f"An error occurred while reading the CSV: {e}")

if __name__ == "__main__":
    main()