FROM python:3.8.12

RUN pip install --upgrade pip
COPY ./Todo_DRF/ ./
RUN pip install -r requirements.txt
RUN pip install gunicorn

COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh
