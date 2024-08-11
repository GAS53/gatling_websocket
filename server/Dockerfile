FROM python:3.12.5-alpine3.20
COPY . ./app
WORKDIR /app
EXPOSE 8000
RUN pip install -r requirements.txt
CMD [ "fastapi", "run", "main.py" ]