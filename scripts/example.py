#!/usr/bin/env python3
"""
Simple Python example script for the Electron desktop app.
This script demonstrates data processing with pandas and returning results.
"""

import json
import sys
from datetime import datetime

try:
    import pandas as pd
except ImportError:
    pd = None


def get_system_info():
    """Return basic system information and sample DataFrame."""
    data = {
        "timestamp": datetime.now().isoformat(),
        "message": "Hello from Python!",
        "calculation": 2 + 2,
        "items": ["React", "Electron", "Python"],
    }

    # Add pandas DataFrame example if available
    if pd is not None:
        df = pd.DataFrame({
            "name": ["Alice", "Bob", "Charlie", "Diana"],
            "age": [28, 34, 23, 31],
            "city": ["New York", "London", "Paris", "Tokyo"],
            "salary": [75000, 85000, 65000, 95000],
        })

        data["pandas_dataframe"] = {
            "columns": df.columns.tolist(),
            "data": df.values.tolist(),
            "shape": list(df.shape),
            "summary": {
                "total_rows": len(df),
                "average_age": float(df["age"].mean()),
                "average_salary": float(df["salary"].mean()),
            },
        }
    else:
        data["pandas_dataframe"] = {"error": "pandas not installed"}

    return data


if __name__ == "__main__":
    try:
        data = get_system_info()
        # Output as JSON for easy parsing in Node.js
        print(json.dumps(data))
        sys.exit(0)
    except Exception as e:
        error_data = {"error": str(e)}
        print(json.dumps(error_data))
        sys.exit(1)
