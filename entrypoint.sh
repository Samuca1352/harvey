#!/bin/bash
set -e

echo "Starting Harvey Web Dashboard on http://0.0.0.0:5555..."
python -m uvicorn harvey.dashboard:app --host 0.0.0.0 --port 5555 &

echo "Starting Harvey Sales Agent..."
exec python -m harvey.main
